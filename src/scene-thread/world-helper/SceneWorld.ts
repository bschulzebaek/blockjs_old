import SceneChunk from './SceneChunk';
import BlockID from '../../data/block-id';
import onBlockChanged from './block-changed';

export default class SceneWorld {

    private readonly map: Map<string, SceneChunk> = new Map();

    public setChunks = (chunks: { id: string, blocks: any, changed: boolean }[]) => {
        chunks.forEach(this.setChunk);
    }

    public setChunk = ({ id, blocks, changed }: { id: string, blocks: any, changed: boolean }) => {
        setTimeout(() => {
            if (!changed && this.map.has(id)) {
                return;
            }

            const [x, z] = id.split(':');

            this.map.set(id, new SceneChunk(x, z, blocks));
        });
    }

    public getBlockId(x: number, y: number, z: number): BlockID {
        const chunk = this.getChunk(x, z);

        if (!chunk) {
            return BlockID.OUT_OF_CHUNK;
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

        const currentBlockId = chunk.getBlockId(x, y, z);

        const blockX = Math.floor(x) - chunk.getX(),
              blockY = Math.floor(y),
              blockZ = Math.floor(z) - chunk.getZ();

        chunk.setBlockId(blockX, blockY, blockZ, blockId);

        onBlockChanged(currentBlockId, blockId, x, y, z);
    }
}