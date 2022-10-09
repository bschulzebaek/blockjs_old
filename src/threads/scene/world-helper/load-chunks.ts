import SceneContainer from '../SceneContainer';
import Message from '../../../shared/utility/Message';
import { WorldMessages } from '../../../shared/messages/ThreadMessages';

export default function loadChunks(ids: string[]) {
    Message.send(WorldMessages.IN_CREATE_CHUNKS, ids, SceneContainer.getWorldPort());
}