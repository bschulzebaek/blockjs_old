import WorldContainer from '../WorldContainer';
import { SceneMessages } from '../../shared/messages/ThreadMessages';
import Message from '../../shared/utility/Message';

export default function syncToScene(newChunks: string[] = [], removeChunks: string[] = []) {
    Message.send(
        SceneMessages.SYNC_WORLD,
        getSceneData(newChunks, removeChunks),
        WorldContainer.getScenePort()
    );
}

// @ts-ignore
function getSceneData(newChunks: string[] = [], removeChunks: string[] = []) {
    return WorldContainer.getWorld().getChunks().map((chunk) => ({
        id: chunk.getId(),
        blocks: chunk.getBlocks()
    }));
}
