import BlockID from '../../data/block-id';
import Chunk from '../chunk/Chunk';
import WorldInterface from './WorldInterface';
import BlockUpdatedEvent from './events/BlockUpdatedEvent';
import getChunkMap from './utility/get-chunk-map';
import ChunkNotFoundError from './exceptions/ChunkNotFoundError';

export default class World implements WorldInterface {
    private readonly map: Map<string, Chunk>;

    constructor(chunks: Map<string, Chunk> = new Map()) {
        this.map = chunks;
    }

    public chunkExists(id: string) {
        return this.map.has(id);
    }

    public getMap() {
        return this.map;
    }

    public getChunkIds() {
        return Array.from(this.map.keys());
    }

    public getChunkByWorldPosition(x: number, z: number, strict = false) {
        return this.getChunkById(Chunk.worldToId(x, z), strict);
    }

    public getChunkByBlockPosition(x: number, z: number, strict = false) {
        return this.getChunkById(Chunk.blockToId(x, z), strict);
    }

    public getChunkById(id: string, strict = false) {
        const chunk = this.map.get(id);

        if (!chunk && strict) {
            throw new ChunkNotFoundError(id);
        }

        return chunk;
    }

    public getChunks(): Chunk[] {
        return Array.from(this.map.values());
    }

    public pushChunk(chunk: Chunk) {
        this.map.set(chunk.getId(), chunk);
    }

    public popChunk(id: string): Chunk {
        const chunk = this.map.get(id);

        this.map.delete(id);

        return chunk as Chunk;
    }

    public getBlockId(x: number, y: number, z: number): BlockID {
        const chunk = this.getChunkByBlockPosition(x, z);

        if (!chunk) {
            return BlockID.OUT_OF_CHUNK;
        }

        const blockX = Math.floor(x) - chunk.getBlockX(),
              blockY = Math.floor(y),
              blockZ = Math.floor(z) - chunk.getBlockZ();

        return chunk.getBlockId(blockX, blockY, blockZ);
    }

    public getBlock(x: number, y: number, z: number) {
        const chunk = this.getChunkByBlockPosition(x, z);

        if (!chunk) {
            return;
        }

        const blockX = Math.floor(x) - chunk.getBlockX(),
              blockY = Math.floor(y),
              blockZ = Math.floor(z) - chunk.getBlockZ();

        return chunk.getBlock(blockX, blockY, blockZ);
    }

    public setBlockId(x: number, y: number, z: number, blockId: BlockID) {
        const id = Chunk.blockToId(x, z);
        const chunk = this.getChunkById(id);

        if (!chunk) {
            throw new ChunkNotFoundError(id);
        }

        const blockX = Math.floor(x) - chunk.getBlockX(),
              blockY = Math.floor(y),
              blockZ = Math.floor(z) - chunk.getBlockZ();

        const oldBlockId = this.getBlockId(x, y, z);

        chunk.setBlockId(blockX, blockY, blockZ, blockId);

        dispatchEvent(new BlockUpdatedEvent(x, y, z, oldBlockId, blockId));
    }

    static createChunkMap(renderDistance: number, offsetX: number = 0, offsetZ: number = 0, addChunks = false): Map<string, undefined|Chunk> {
        return getChunkMap(renderDistance, offsetX, offsetZ, addChunks);
    }
}