import Chunk from '../../../content/chunk/Chunk';
import BlockID from '../../../data/block-id';

const CHUNK_LAYER_SIZE = 256; //Chunk.WIDTH * Chunk.LENGTH;

function createDebugChunk(id: string): Chunk {
    const [x, z] = id.split(':');

    const blocks: BlockID[] = Chunk.getEmptyBlocks();

    blocks.splice(0, CHUNK_LAYER_SIZE, ...new Array(CHUNK_LAYER_SIZE).fill(BlockID.BEDROCK));
    blocks.splice(CHUNK_LAYER_SIZE, CHUNK_LAYER_SIZE, ...new Array(CHUNK_LAYER_SIZE).fill(BlockID.GRASS));

    blocks[CHUNK_LAYER_SIZE * 2] = BlockID.STONE;
    blocks[CHUNK_LAYER_SIZE * 2 + 15] = BlockID.SANDSTONE;
    blocks[CHUNK_LAYER_SIZE * 3 - 16] = BlockID.GLASS;
    blocks[CHUNK_LAYER_SIZE * 3 - 1] = BlockID.LOG;

    return new Chunk(parseInt(x), parseInt(z), blocks);
}

export {
    createDebugChunk,
}