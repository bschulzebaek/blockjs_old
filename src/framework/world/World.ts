import Chunk from './chunk/Chunk';
import WorldInterface from './WorldInterface';
import BlockID from '../data/block-id';
import SolidShader from '../renderer/shader/block/solid/SolidShader';
import GlassShader from '../renderer/shader/block/glass/GlassShader';

export default class World implements WorldInterface {
    private map: Map<string, Chunk> = new Map();

    private solidShader!: SolidShader
    private glassShader!: GlassShader;

    constructor(chunks: Chunk[] = []) {
        chunks.forEach(this.pushChunk.bind(this));
    }

    public createShader() {
        this.solidShader = new SolidShader();
        this.glassShader = new GlassShader();
    }

    public update(): void {
        this.map.forEach((chunk) => {
            this.solidShader.run(chunk.getSolidModel());
            this.glassShader.run(chunk.getGlassModel());
        });
    }

    public createModel() {

    }

    public chunkExists(x: number, z: number): boolean {
        return !!this.getChunk(x, z);
    }

    public getChunk(x: number, z: number): Chunk | null {
        return this.map.get(Chunk.getId(x, z)) ?? null;
    }

    public getChunks(): Chunk[] {
        return Array.from(this.map.values());
    }

    public pushChunk(chunk: Chunk): void {
        this.map.set(chunk.getId(), chunk);
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

    public setBlockId(x: number, y: number, z: number, blockId: BlockID): void {
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