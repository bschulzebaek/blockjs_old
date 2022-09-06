import BlockID from '../../data/block-id';
import WorldContainer from '../WorldContainer';
import worldSync from '../world-sync';
import Chunk from '../chunk/Chunk';
import ChunkNotFoundError from '../../shared/exceptions/ChunkNotFoundError';

export default function setBlock(x: number, y: number, z: number, blockId: BlockID): void {
    const world   = WorldContainer.getWorld(),
          chunkId = Chunk.getFormattedId(x, z),
          chunk   = world.getChunkById(chunkId);

    if (!chunk) {
         throw new ChunkNotFoundError(chunkId);
    }

    world.setBlockId(x, y, z, blockId);
    worldSync([ chunkId ]);
    WorldContainer.getChunkRepository().write(chunk);
}