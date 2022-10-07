import SceneContainer from '../SceneContainer';
import Chunk from '../../../components/chunk/Chunk';
import { iterateChunk3D } from '../../../components/world/utility/iterate-chunk-coords';
import BlockID from '../../../data/block-id';

export default function onChunkReady(chunkData: any) {
    setTimeout(() => {
        const blocks = Chunk.getEmptyBlocks(),
            blockIds: BlockID[] = Array.from(chunkData.blockIds);

        iterateChunk3D((x: number, y: number, z: number) => {
             blocks.set(
                 Chunk.getBlockPosition(x, y, z),
                 {
                     id: blockIds.shift()!,
                 },
             );
        });

        SceneContainer.getWorld().pushChunk(new Chunk(
            chunkData.x,
            chunkData.z,
            blocks,
        ));
    });
}