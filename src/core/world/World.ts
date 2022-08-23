
import WorldInterface from './WorldInterface';
import BlockID from '../../data/block-id';
import SolidShader from '../../core/renderer/shader/block/solid/SolidShader';
import GlassShader from '../../core/renderer/shader/block/glass/GlassShader';
import Chunk from '../../content/chunk/Chunk';

export default class World implements WorldInterface {
    private map: Map<string, Chunk>;

    private solidShader!: SolidShader
    private glassShader!: GlassShader;

    constructor(chunks: Map<string, Chunk> = new Map()) {
        this.map = chunks;
    }

    public createShader() {
        this.solidShader = new SolidShader();
        this.glassShader = new GlassShader();
    }

    public update(): void {
        this.map.forEach((chunk) => {
            const solidModel = chunk.getSolidModel();

            if (solidModel) {
                this.solidShader.run(solidModel);
            }

            const glassModel = chunk.getGlassModel();

            if (glassModel) {
                this.glassShader.run(glassModel);
            }
        });
    }

    public createModel() {

    }

    public getMap() {
        return this.map;
    }

    public chunkExists(x: number, z: number): boolean {
        return !!this.getChunk(x, z);
    }

    public getChunk(x: number, z: number): Chunk | null {
        return this.map.get(Chunk.getFormattedId(x, z)) ?? null;
    }

    public getChunks(): Chunk[] {
        return Array.from(this.map.values());
    }

    public pushChunk(chunk: Chunk): void {
        this.map.set(chunk.getId(), chunk);
    }

    public popChunk(key: string): Chunk {
        const chunk = this.map.get(key);

        this.map.delete(key);

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