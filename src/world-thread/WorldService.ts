import { RenderMessages, SceneMessages, WorldMessages } from '../thread-manager/ThreadMessages';
import World from './World';
import { Vector3 } from '../shared/math';
import Chunk from './chunk/Chunk';
import getChunkMap from './utility/get-chunk-map';
import { createDebugChunk } from './generation/debug-world';
import BlockID from '../data/block-id';
import WorldContainer from './WorldContainer';
import setInitialPosition from './utility/set-initial-position';

export default class WorldService {
    static PLAYER_START = new Vector3(-3, 4, -3);
    static VIEW_DISTANCE = 3;

    public async discard() {

    }

    public sync(newChunks: string[] = [], removeChunks: string[] = []) {
        this.syncRenderer(newChunks, removeChunks);
        this.syncScene(newChunks, removeChunks);
    }

    private syncRenderer(newChunks: string[] = [], removeChunks: string[] = []) {
        WorldContainer.getRenderPort().postMessage({
            action: RenderMessages.SYNC_WORLD,
            detail: this.getRendererData(newChunks, removeChunks),
        });
    }

    private getRendererData(newChunks: string[] = [], removeChunks: string[] = []) {
        const add: Record<string, any> = {};
        const world = WorldContainer.getWorld();

        if (!newChunks.length) {
            newChunks = world.getChunks().map((chunk) => chunk.getId());
        }

        newChunks.forEach((chunkId) => {
            const chunk = world.getChunkById(chunkId)!;

            if (!add[chunkId]) {
                add[chunkId] = {};
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
        WorldContainer.getScenePort().postMessage({
            action: SceneMessages.SYNC_WORLD,
            detail: this.getSceneData(newChunks, removeChunks),
        });
    }

    // @ts-ignore
    private getSceneData(newChunks: string[] = [], removeChunks: string[] = []) {
        return WorldContainer.getWorld().getChunkData();
    }

    public async create() {
        await this.createWorld();

        if (WorldContainer.getConfig().getIsNew()) {
            await setInitialPosition();
        }

        WorldContainer.getScenePort().postMessage({ action: WorldMessages.READY });
        postMessage({ action: WorldMessages.READY });
    }

    private async createWorld() {
        const start = Date.now(),
              chunkPosition = this.convertToChunkPosition(WorldService.PLAYER_START),
              chunkMap = getChunkMap(WorldService.VIEW_DISTANCE, chunkPosition.x, chunkPosition.z);

        await WorldContainer.getChunkRepository().readList(chunkMap);

        chunkMap.forEach((chunk, key) => {
            if (chunk) {
                chunk.buildModel();

                return;
            }

            const _chunk = this.generateChunk(key);
            _chunk.buildModel();
            chunkMap.set(key, _chunk);

        });

        WorldContainer.setWorld(new World(chunkMap as Map<string, Chunk>));

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
            chunks: WorldContainer.getWorld().getChunks().length,
            blocks: WorldContainer.getWorld().getChunks().length * Chunk.HEIGHT * Chunk.WIDTH * Chunk.LENGTH,
        });
    }

    public async updateChunkGrid(position: Vector3) {
        const chunkPos = this.convertToChunkPosition(position),
              newMap = getChunkMap(WorldService.VIEW_DISTANCE, chunkPos.x, chunkPos.z),
              oldMap = WorldContainer.getWorld().getMap(),
              chunksToCreate = Array.from(newMap.keys()).filter((key) => !oldMap.has(key)),
              chunksToRemove = Array.from(oldMap.keys()).filter((key) => !newMap.has(key));

        await this.createNewChunks(chunksToCreate);
        this.unloadChunks(chunksToRemove);

        this.sync(chunksToCreate, chunksToRemove);
    }

    private async createNewChunks(chunks: string[]) {
        const world = WorldContainer.getWorld(),
              createMap: Map<string, Chunk|undefined> = new Map(chunks.map((id) => [ id, undefined ]));

        await WorldContainer.getChunkRepository().readList(createMap);

        createMap.forEach((chunk, key) => {
            if (!chunk) {
                chunk = this.generateChunk(key);
            }

            chunk!.buildModel();
            world.pushChunk(chunk!);
        });
    }

    private unloadChunks(chunks: string[]) {
        const world = WorldContainer.getWorld();

        const saveChunks = chunks.map((key) => {
            return world.popChunk(key);
        });

        WorldContainer.getChunkRepository().writeList(saveChunks);
    }

    public setBlockId(x: number, y: number, z: number, blockId: BlockID): void {
        const world = WorldContainer.getWorld();

        world.setBlockId(x, y, z, blockId);
        WorldContainer.getChunkRepository().write(world.getChunk(x, z)!);

        this.sync([ Chunk.getFormattedId(x, z) ]);

    }
}