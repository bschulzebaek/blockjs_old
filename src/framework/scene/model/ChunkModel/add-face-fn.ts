import BlockID from '../../../data/block-id';
import { ChunkModelType } from './ChunkModel';

function addSolidFace(facing: BlockID): boolean {
    return facing === BlockID.AIR || facing === BlockID.GLASS || facing === BlockID.OUT_OF_CHUNK;
}

function addGlassFace(facing: BlockID): boolean {
    return facing !== BlockID.GLASS;
}

export default function getFaceFn(type: ChunkModelType) {
    if (type === ChunkModelType.GLASS) {
        return addGlassFace;
    } else {
        return addSolidFace;
    }
}