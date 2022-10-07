import Message from '../../../shared/utility/Message';
import { WorldMessages } from '../../../shared/messages/ThreadMessages';
import Chunk from '../../../components/chunk/Chunk';

export default function pushToScene(chunk: Chunk, port: MessagePort) {
    const [x, z] = chunk.getId().split(':');

    const blockIds = new Uint8Array(chunk.getBlockIds());

    Message.send(WorldMessages.OUT_CHUNK_READY, {
        x,
        z,
        blockIds: new Uint8Array(chunk.getBlockIds()),
    }, port, [ blockIds.buffer ]);
}