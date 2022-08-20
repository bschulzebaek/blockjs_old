import Chunk from './chunk/Chunk';
import WorldInterface from './WorldInterface';
import CameraInterface from '../camera/CameraInterface';

import BlockID from '../../data/block-id';
import VoxelShader from '../../renderer/shader/voxel/VoxelShader';
import GlassShader from '../../renderer/shader/glass/GlassShader';

export default class World implements WorldInterface {
    public chunks: Chunk[] = [];
    public chunkGrid: string[] = [];

    private voxelShader: VoxelShader;
    private glassShader: GlassShader;

    constructor(context: WebGL2RenderingContext, camera: CameraInterface) {
        this.glassShader = new GlassShader(context, camera, this);
        this.voxelShader = new VoxelShader(context, camera, this);
    }

    public update(): void {
        // this.voxelShader.run();
        this.glassShader.run();
    }

    public chunkExists(x: number, z: number): boolean {
        return !!this.getChunk(x, z);
    }

    public getChunk(x: number, z: number): Chunk {
        const { chunkGrid, chunks } = this;
        const chunkId = this.getChunkId(x, z);

        return chunks[chunkGrid.indexOf(chunkId)] ?? null;
    }

    public getChunks(): Chunk[] {
        return this.chunks;
    }

    public pushChunk(chunk: Chunk): void {
        this.chunks.push(chunk);
        this.chunkGrid.push(chunk.getId());
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

    private getChunkId(x: number, z: number): string {
        const chunkX = Math.floor(x / Chunk.WIDTH),
              chunkZ = Math.floor(z / Chunk.LENGTH);

        return `${chunkX}:${chunkZ}`;
    }
}