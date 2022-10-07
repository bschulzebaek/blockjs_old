import { iterateChunk2D } from '../../utility/iterate-chunk-coords';
import { SEA_LEVEL } from './configuration';
import BlockID from '../../../../data/block-id';
import { BlockMap } from '../../../chunk/Chunk';

export default function fillWaterBodies(blocks: BlockMap) {
    iterateChunk2D((x: number, z: number) => {
        let currentY = SEA_LEVEL;
        let blockId = null;

        while (blockId !== BlockID.STONE && currentY) {
            const block = blocks.get(`${x}:${currentY}:${z}`)!;

            blockId = block.id;

            if (blockId === BlockID.AIR) {
                block.id = BlockID.WATER;
            }

            currentY--;
        }
    });
}