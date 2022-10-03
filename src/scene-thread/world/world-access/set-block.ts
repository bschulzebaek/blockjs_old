import BlockID from '../../../data/block-id';
import SceneContainer from '../../SceneContainer';
import worldSync from '../world-sync';
import Chunk from '../chunk/Chunk';
import ChunkNotFoundError from '../../../shared/exceptions/ChunkNotFoundError';

export default function setBlock(x: number, y: number, z: number, blockId: BlockID): void {
    const world   = SceneContainer.getWorld(),
          chunkId = Chunk.getFormattedId(x, z),
          chunk   = world.getChunkById(chunkId);

    if (!chunk) {
         throw new ChunkNotFoundError(chunkId);
    }

    world.setBlockId(x, y, z, blockId);
    worldSync([ chunkId ]);

    SceneContainer.getWorldService().saveChunk(chunk);
}