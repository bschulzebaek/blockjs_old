import Chunk, { BlockMap } from '../../../chunk/Chunk';
import { iterateChunk2D } from '../../utility/iterate-chunk-coords';
import BlockID from '../../../../data/block-id';
import { SEA_LEVEL } from './configuration';
import BlockInterface from '../../../chunk/BlockInterface';

function getBlockId(block: BlockInterface) {
    const { continentalness, humidity, temperature } = block;

    // +humidity && +temperature = Jungle
    // +humidity && -temperature = Swamp
    // -humidity && +temperature = Desert
    // -humidity && -temperature = Snowy plains

    if (continentalness! > 0.76) {
        return humidity! < -0.5 ? BlockID.SANDSTONE : BlockID.STONE;
    }

    if (humidity! < -0.5 && temperature! > 0.5) {
        return BlockID.SAND;
    }

    return BlockID.GRASS;
}

export default function paintSurface(blocks: BlockMap) {
    iterateChunk2D((x: number, z: number) => {
        let currentY = Chunk.HEIGHT - 1;
        let block = blocks.get(`${x}:${currentY}:${z}`)!;

        while (block.id !== BlockID.STONE && currentY >= SEA_LEVEL) {
            block = blocks.get(`${x}:${currentY}:${z}`)!;

            currentY--;
        }

        if (block.id === BlockID.WATER) {
            return;
        }

        block.id = getBlockId(block);
    });
}