import SceneChunk from './SceneChunk';
import BlockID from '../../../data/block-id';

export default class SceneWorld {

    private readonly map: Map<string, SceneChunk> = new Map();

    public setChunks(chunks: any[]) {
        chunks.forEach(({ id, blocks }: { id: string, blocks: any }) => {
            const [x, z] = id.split(':');

            this.map.set(id, new SceneChunk(x, z, blocks));
        });
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


    public getChunk(x: number, z: number): SceneChunk | null {
        return this.map.get(SceneChunk.getFormattedId(x, z)) ?? null;
    }

    public chunkExists(x: number, z: number): boolean {
        return !!this.getChunk(x, z);
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