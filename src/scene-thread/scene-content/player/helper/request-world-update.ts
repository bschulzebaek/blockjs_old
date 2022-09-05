import SceneChunk from '../../../world-helper/SceneChunk';
import SceneContainer from '../../../SceneContainer';
import { SceneMessages } from '../../../../thread-manager/ThreadMessages';

let lastChunkId = '0:0';

export default function requestWorldUpdate(x: number, z: number) {
    const chunkId = SceneChunk.getFormattedId(x, z);

    if (chunkId !== lastChunkId) {
        lastChunkId = chunkId;

        SceneContainer.getWorldPort()?.postMessage({
            action: SceneMessages.REQUEST_WORLD_UPDATE,
            detail: {
                x,
                z,
            }
        });
    }
}