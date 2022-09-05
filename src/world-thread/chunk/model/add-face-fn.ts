import BlockID from '../../../data/block-id';
import { ChunkModelType } from './ChunkModel';

function addSolidFace(facing: BlockID): boolean {
    return facing === BlockID.AIR || facing === BlockID.GLASS || facing === BlockID.OUT_OF_CHUNK;
}

function addGlassFace(facing: BlockID): boolean {
    return facing !== BlockID.GLASS;
}

function skipGlass(blockId: BlockID) {
    return blockId !== BlockID.GLASS;
}

function skipSolid(blockId: BlockID) {
    return blockId === BlockID.AIR || blockId === BlockID.GLASS;
}

function getSkipFn(type: ChunkModelType) {
    if (type === ChunkModelType.GLASS) {
        return skipGlass;
    } else {
        return skipSolid;
    }
}

function getFaceFn(type: ChunkModelType) {
    if (type === ChunkModelType.GLASS) {
        return addGlassFace;
    } else {
        return addSolidFace;
    }
}

export {
    getSkipFn,
    getFaceFn
}