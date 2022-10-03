import BlockID from '../../data/block-id';
import Chunk from './chunk/Chunk';
import WorldInterface from './WorldInterface';

export default class World implements WorldInterface {
    private readonly map: Map<string, Chunk>;

    constructor(chunks: Map<string, Chunk> = new Map()) {
        this.map = chunks;
    }

    public chunkExists(x: number, z: number) {
        return !!this.getChunk(x, z);
    }

    public getMap() {
        return this.map;
    }

    public getChunkIds() {
        return Array.from(this.map.keys());
    }

    public getChunk(x: number, z: number) {
        return this.map.get(Chunk.getFormattedId(x, z));
    }

    public getChunkById(id: string) {
        return this.map.get(id);
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
        const chunk = this.getChunk(x, z);

        if (!chunk) {
            return BlockID.AIR;
        }

        const blockX = Math.floor(x) - chunk.getX(),
              blockY = Math.floor(y),
              blockZ = Math.floor(z) - chunk.getZ();

        return chunk.getBlockId(blockX, blockY, blockZ);
    }

    public setBlockId(x: number, y: number, z: number, blockId: BlockID) {
        const chunk = this.getChunk(x, z);

        if (!chunk) {
            return;
        }

        const blockX = Math.floor(x) - chunk.getX(),
              blockY = Math.floor(y),
              blockZ = Math.floor(z) - chunk.getZ();

        chunk.setBlockId(blockX, blockY, blockZ, blockId);
    }
}