import { Vector3 } from '../../shared/math';
import Chunk from './chunk/Chunk';
import StorageAdapter from '../../shared/storage/StorageAdapter';
import ChunkRepository from './chunk/ChunkRepository';
import SceneContainer from '../SceneContainer';
import getChunkMap from './utility/get-chunk-map';
import setInitialPosition from './utility/set-start-position';
import getInitialPosition from './utility/get-player-offset';
import generateChunk from './world-generation/generate-chunk';
import worldSync from './world-sync';
import logger from '../../shared/utility/logger';
import BlockID from '../../data/block-id';

export default class WorldService {
    static VIEW_DISTANCE = 5;

    private repository: ChunkRepository;

    constructor(adapter: StorageAdapter) {
        this.repository = new ChunkRepository(adapter);
    }

    public async create() {
        await this.createWorld(await getInitialPosition());

        if (SceneContainer.getConfig().getIsNew()) {
            await setInitialPosition();
        }
    }

    private async createWorld(position: Vector3) {
        const start = performance.now(),
              chunkPosition = this.convertToChunkPosition(position),
              chunkMap = getChunkMap(WorldService.VIEW_DISTANCE, chunkPosition.x, chunkPosition.z),
              chunkIds = Array.from(chunkMap.keys());

        await this.createChunks(chunkIds);
        worldSync(chunkIds);

        this.printStats(start);
    }

    private convertToChunkPosition(position: Vector3) {
        return new Vector3(Math.floor(position.x / Chunk.WIDTH), 0, Math.floor(position.z / Chunk.LENGTH))
    }

    public async updateChunkGrid(position: Vector3) {
        const chunkPos = this.convertToChunkPosition(position),
              newMap = getChunkMap(WorldService.VIEW_DISTANCE, chunkPos.x, chunkPos.z),
              oldMap = SceneContainer.getWorld().getMap(),
              chunksToCreate = Array.from(newMap.keys()).filter((key) => !oldMap.has(key)),
              chunksToRemove = Array.from(oldMap.keys()).filter((key) => !newMap.has(key));

        this.unloadChunks(chunksToRemove);
        await this.createChunks(chunksToCreate);

        worldSync(chunksToCreate, chunksToRemove);
    }

    public saveChunk(chunk: Chunk) {
        return this.repository.write(chunk);
    }

    public async createChunks(ids: string[]) {
        const world = SceneContainer.getWorld(),
              createMap: Map<string, Chunk|undefined> = new Map(ids.map((id) => [ id, undefined ]));

        await this.repository.readList(createMap);

        createMap.forEach((chunk, id) => {
            if (!chunk) {
                chunk = generateChunk(id);
            }

            world.pushChunk(chunk);
        });
    }

    public async unloadChunks(ids: string[]) {
        const world = SceneContainer.getWorld();

        ids.forEach((id) => {
            world.popChunk(id);
        });
    }

    public setBlock(x: number, y: number, z: number, id: BlockID) {
        SceneContainer.getWorld().setBlockId(x, y, z, id);

        worldSync([ Chunk.getFormattedId(x, z) ]);
    }

    private printStats(start: number) {
        const delta = (performance.now() - start).toFixed(0)

        logger(`[WorldService] Generating chunks took: ${delta}ms.`)
        logger({
            chunks: SceneContainer.getWorld().getChunks().length,
            blocks: SceneContainer.getWorld().getChunks().length * Chunk.HEIGHT * Chunk.WIDTH * Chunk.LENGTH,
        });
    }
}