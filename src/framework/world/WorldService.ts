import Container, { ServiceName } from '../Container';
import ServiceInterface from '../ServiceInterface';
import StorageAdapter from '../storage/StorageAdapter';
import { createDebugChunk } from './generation/debug-world';
import ChunkRepository from './chunk/ChunkRepository';
import World from './World';
import Vector3 from '../../math/Vector3';
import Chunk from './chunk/Chunk';
import getChunkMap from './utility/get-chunk-map';

export default class WorldService implements ServiceInterface {

    static VIEW_DISTANCE = 2;

    private chunkRepository: ChunkRepository;
    private world: World;
    // @ts-ignore
    private seed: string = '';

    constructor(adapter: StorageAdapter) {
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
        Container.getService(ServiceName.ENTITY).getPlayer()?.setPosition(new Vector3(-2, 7, -2));

        await this.createWorld();
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

            chunkMap.set(key, createDebugChunk(key));
        });

        this.world = new World(chunkMap as Map<string, Chunk>);
        this.printStats(start);
    }

    public getWorld() {
        return this.world;
    }

    public updateChunkGrid(position: Vector3) {
        const chunkPos = this.convertToChunkPosition(position);
        const newMap = getChunkMap(WorldService.VIEW_DISTANCE, chunkPos.x, chunkPos.z),
              oldMap = this.world.getMap();

        const chunksToCreate = Array.from(newMap.keys()).filter((key) => !oldMap.has(key)),
              chunksToRemove = Array.from(oldMap.keys()).filter((key) => !newMap.has(key));

        chunksToCreate.forEach((key) => {
            const chunk = createDebugChunk(key);

            chunk.buildModel();

            this.world.pushChunk(chunk);
        });

        const saveChunks = chunksToRemove.map((key) => {
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
}