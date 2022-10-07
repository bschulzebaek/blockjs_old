import Message from '../../../shared/utility/Message';
import { WorldMessages } from '../../../shared/messages/ThreadMessages';
import SceneContainer from '../SceneContainer';

export default function updateChunkModel(id: string) {
    Message.send(WorldMessages.IN_UPDATE_CHUNK, id, SceneContainer.getWorldPort());
}