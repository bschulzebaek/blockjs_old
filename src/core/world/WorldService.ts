import Container, { ServiceName } from '../../core/Container';
import { createDebugChunk } from './generation/debug-world';
import World from './World';
import getChunkMap from './utility/get-chunk-map';
import Service from '../Service';
import ChunkRepository from '../../content/chunk/ChunkRepository';
import StorageAdapter from '../storage/StorageAdapter';
import Chunk from '../../content/chunk/Chunk';
import { Vector3 } from '../../common/math';

export default class WorldService extends Service {

    static VIEW_DISTANCE = 3;

    private chunkRepository: ChunkRepository;
    private world: World;
    // @ts-ignore
    private seed: string = '';

    constructor(adapter: StorageAdapter) {
        super();

        this.chunkRepository = new ChunkRepository(adapter);
        this.world = new World();
    }

    public beforePlay() {
        this.world.createShader();
        this.world.getChunks().forEach((chunk) => chunk.buildModel());

        Container.getService(ServiceName.SCENE).addEntity(this.world);
    }

    public async discard() {
        await this.chunkRepository.writeList(Array.from(this.world.getChunks()));
    }

    public async create() {
        await this.createWorld();

        const player = Container.getService(ServiceName.ENTITY).getPlayer()!;

        while (player.isBlocked()) {
            player.getPosition().add(0, 1, 0);
        }
    }

    public async load() {
        await this.createWorld();
    }

    private async createWorld() {
        const start = Date.now();

        this.seed = Container.getService(ServiceName.GAME_CONFIG).getConfig().getSeed();

        const player = Container.getService(ServiceName.ENTITY).getPlayer()!,
              chunkPosition = this.convertToChunkPosition(player.getPosition()),
              chunkMap = getChunkMap(WorldService.VIEW_DISTANCE, chunkPosition.x, chunkPosition.z);

        await this.chunkRepository.readList(chunkMap);

        chunkMap.forEach((chunk, key) => {
            if (chunk) {
                return;
            }

            chunkMap.set(key, this.generateChunk(key));
        });

        this.world = new World(chunkMap as Map<string, Chunk>);

        this.printStats(start);
    }

    public getWorld() {
        return this.world;
    }

    public updateChunkGrid(position: Vector3) {
        const chunkPos = this.convertToChunkPosition(position),
              newMap = getChunkMap(WorldService.VIEW_DISTANCE, chunkPos.x, chunkPos.z),
              oldMap = this.world.getMap(),
              chunksToCreate = Array.from(newMap.keys()).filter((key) => !oldMap.has(key)),
              chunksToRemove = Array.from(oldMap.keys()).filter((key) => !newMap.has(key));

        this.createNewChunks(chunksToCreate);
        this.unloadChunks(chunksToRemove);
    }

    private async createNewChunks(chunks: string[]) {
        const createMap: Map<string, Chunk|undefined> = new Map(chunks.map((id) => [ id, undefined ]));

        await this.chunkRepository.readList(createMap);

        createMap.forEach(async (chunk, key) => {

            if (!chunk) {
                chunk = this.generateChunk(key);
            }

            chunk.buildModel();
            this.world.pushChunk(chunk);
        });
    }

    private unloadChunks(chunks: string[]) {
        // ToDo: Keep nearby chunks cached, only remove chunks in given distance!

        const saveChunks = chunks.map((key) => {
            return this.world.popChunk(key);
        });

        this.chunkRepository.writeList(saveChunks);
    }

    private convertToChunkPosition(position: Vector3) {
        return new Vector3(Math.floor(position.x / Chunk.WIDTH), 0, Math.floor(position.z / Chunk.LENGTH))
    }

    private printStats(start: number, end: number = Date.now()): void {
        console.debug(`[World] Generating chunks took: ${end - start}ms.`)
        console.debug({
            chunks: this.world.getChunks().length,
            blocks: this.world.getChunks().length * Chunk.HEIGHT * Chunk.WIDTH * Chunk.LENGTH,
        });
    }

    private generateChunk(chunkId: string) {
        return createDebugChunk(chunkId);
    }

    public saveChunk(chunk: Chunk) {
        this.chunkRepository.write(chunk);
    }
}