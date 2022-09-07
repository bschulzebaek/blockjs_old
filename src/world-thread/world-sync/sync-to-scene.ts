import WorldContainer from '../WorldContainer';
import { SceneMessages } from '../../shared/messages/ThreadMessages';
import Message from '../../shared/utility/Message';

export default function syncToScene(newChunks: string[] = []) {
    const world = WorldContainer.getWorld();

    newChunks.forEach((id) => {
        setTimeout(() => {
            const chunk = world.getChunkById(id);

            if (!chunk) {
                return;
            }

            Message.send(
                SceneMessages.SYNC_CHUNK,
                {
                    changed: chunk.getChanged(),
                    id: chunk.getId(),
                    blocks: chunk.getBlocks()
                },
                WorldContainer.getScenePort()
            );
        });
    });
}


