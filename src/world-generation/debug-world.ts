import Chunk from '../engine/world/chunk/Chunk';
import BlockID from '../data/block-id';

function getBlockIdForY(y: number) {
    if (y < 2) {
        return BlockID.BEDROCK;
    } else if (y === 2) {
        return BlockID.STONE;
    } else if (y === 3) {
        return BlockID.GRASS;
    } else {
        return BlockID.AIR;
    }
}

function createDebugChunk(id: string): Chunk {
    const [x, z] = id.split(':');

    const blocks = Chunk.getEmptyBlocks();

    for (let y = 0; y < 4; y++) {
        const blockId = getBlockIdForY(y);

        for (let x = 0; x < Chunk.WIDTH; x++) {
            for (let z = 0; z < Chunk.LENGTH; z++) {
                blocks.set(Chunk.getBlockPosition(x, y, z), {
                    id: blockId,
                });
            }
        }
    }

    blocks.set('0:4:0', { id: BlockID.STONE });
    blocks.set('15:4:0', { id: BlockID.SANDSTONE });
    blocks.set('0:4:15', { id: BlockID.GLASS });
    blocks.set('15:4:15', { id: BlockID.LOG });

    return new Chunk(parseInt(x), parseInt(z), blocks);
}

export {
    createDebugChunk,
}