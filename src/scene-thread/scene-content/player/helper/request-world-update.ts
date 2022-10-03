import Chunk from '../../../world/chunk/Chunk';
import SceneContainer from '../../../SceneContainer';
import { Vector3 } from '../../../../shared/math';

let lastChunkId = '';

export default function requestWorldUpdate(x: number, z: number) {
    const chunkId = Chunk.getFormattedId(x, z);

    if (!lastChunkId) {
        lastChunkId = chunkId;
    }

    if (chunkId !== lastChunkId) {
        lastChunkId = chunkId;

        SceneContainer.getWorldService().updateChunkGrid(new Vector3(x, 0, z));
    }
}