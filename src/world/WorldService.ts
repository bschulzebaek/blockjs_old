import { RenderMessages, SceneMessages, WorldMessages } from '../engine/threads/ThreadMessages';
import World from './World';
import { Vector3 } from '../shared/math';
import Chunk from './chunk/Chunk';
import getChunkMap from './utility/get-chunk-map';
import { createDebugChunk } from './generation/debug-world';

export default class WorldService {
    static PLAYER_START = new Vector3(-3, 4, -3);
    static VIEW_DISTANCE = 3;

    private renderer?: MessagePort;
    private scene?: MessagePort;
    private world = new World();

    public setRenderPort(port: MessagePort) {
        this.renderer = port;
    }

    public setScenePort(port: MessagePort) {
        this.scene = port;
    }

    public sync(newChunks: string[] = [], removeChunks: string[] = []) {
        this.syncRenderer(newChunks, removeChunks);
        this.syncScene(newChunks, removeChunks);
    }

    private syncRenderer(newChunks: string[] = [], removeChunks: string[] = []) {
        this.renderer?.postMessage({
            action: RenderMessages.SYNC_WORLD,
            detail: this.getRendererData(newChunks, removeChunks),
        });
    }

    private getRendererData(newChunks: string[] = [], removeChunks: string[] = []) {
        const chunks = this.world.getChunks(),
              add: Record<string, any> = {};

        chunks.forEach((chunk) => {
            if (newChunks.length && !newChunks.includes(chunk.getId())) {
                return;
            }

            if (!add[chunk.getId()]) {
                add[chunk.getId()] = {};
            }

            const solid = chunk.getSolidModel(),
                  glass = chunk.getGlassModel();

            add[chunk.getId()].solid = {
                shader: 'chunk-solid',
                view: new Float32Array(solid.view!),
                indices: solid.mesh.indices,
                vertices: solid.mesh.vertices,
                normals: solid.mesh.normals,
                uvs: solid.mesh.uvs,
                faces: solid.mesh.faces,
                arrayObj: solid.mesh.arrayObj,
            };

            add[chunk.getId()].glass = {
                shader: 'chunk-glass',
                view: new Float32Array(glass.view!),
                indices: glass.mesh.indices,
                vertices: glass.mesh.vertices,
                normals: glass.mesh.normals,
                uvs: glass.mesh.uvs,
                faces: glass.mesh.faces,
                arrayObj: glass.mesh.arrayObj,
            };
        });

        return {
            remove: removeChunks,
            add
        }
    }

    private syncScene(newChunks: string[] = [], removeChunks: string[] = []) {
        this.scene?.postMessage({
            action: SceneMessages.SYNC_WORLD,
            detail: this.getSceneData(newChunks, removeChunks),
        });
    }

    // @ts-ignore
    private getSceneData(newChunks: string[] = [], removeChunks: string[] = []) {
        return this.world.getChunkData();
    }

    // @ts-ignore
    public async create(config: any) {
        await this.createWorld();

        postMessage({ action: WorldMessages.READY, detail: { isNew: true }});
    }

    private async createWorld() {
        const start = Date.now(),
              chunkPosition = this.convertToChunkPosition(WorldService.PLAYER_START),
              chunkMap = getChunkMap(WorldService.VIEW_DISTANCE, chunkPosition.x, chunkPosition.z);

        // await this.chunkRepository.readList(chunkMap);

        chunkMap.forEach((chunk, key) => {
            if (chunk) {
                return;
            }

            const _chunk = this.generateChunk(key);
            _chunk.buildModel();
            chunkMap.set(key, _chunk);
        });

        this.world = new World(chunkMap as Map<string, Chunk>);

        this.printStats(start);
    }

    private generateChunk(chunkId: string) {
        return createDebugChunk(chunkId);
    }

    private convertToChunkPosition(position: Vector3) {
        return new Vector3(Math.floor(position.x / Chunk.WIDTH), 0, Math.floor(position.z / Chunk.LENGTH))
    }

    private printStats(start: number, end: number = Date.now()): void {
        console.debug(`[WorldService] Generating chunks took: ${end - start}ms.`)
        console.debug({
            chunks: this.world.getChunks().length,
            blocks: this.world.getChunks().length * Chunk.HEIGHT * Chunk.WIDTH * Chunk.LENGTH,
        });
    }

    public async updateChunkGrid(position: Vector3) {
        const chunkPos = this.convertToChunkPosition(position),
            newMap = getChunkMap(WorldService.VIEW_DISTANCE, chunkPos.x, chunkPos.z),
            oldMap = this.world.getMap(),
            chunksToCreate = Array.from(newMap.keys()).filter((key) => !oldMap.has(key)),
            chunksToRemove = Array.from(oldMap.keys()).filter((key) => !newMap.has(key));

        await this.createNewChunks(chunksToCreate);
        this.unloadChunks(chunksToRemove);

        this.sync(chunksToCreate, chunksToRemove);
    }

    private async createNewChunks(chunks: string[]) {
        const createMap: Map<string, Chunk|undefined> = new Map(chunks.map((id) => [ id, undefined ]));

        // await this.chunkRepository.readList(createMap);

        createMap.forEach((chunk, key) => {
            if (!chunk) {
                chunk = this.generateChunk(key);
            }

            chunk.buildModel();
            this.world.pushChunk(chunk);
        });
    }

    private unloadChunks(chunks: string[]) {
        // @ts-ignore
        const saveChunks = chunks.map((key) => {
            return this.world.popChunk(key);
        });

        // this.chunkRepository.writeList(saveChunks);
    }
}