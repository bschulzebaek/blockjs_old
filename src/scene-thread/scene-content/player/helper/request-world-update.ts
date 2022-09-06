import SceneChunk from '../../../world-helper/SceneChunk';
import SceneContainer from '../../../SceneContainer';
import { SceneMessages } from '../../../../shared/messages/ThreadMessages';
import Message from '../../../../shared/utility/Message';

let lastChunkId = '';

export default function requestWorldUpdate(x: number, z: number) {
    const chunkId = SceneChunk.getFormattedId(x, z);

    if (!lastChunkId) {
        lastChunkId = chunkId;
    }

    if (chunkId !== lastChunkId) {
        lastChunkId = chunkId;

        Message.send(SceneMessages.REQUEST_WORLD_UPDATE, { x, z }, SceneContainer.getWorldPort());
    }
}