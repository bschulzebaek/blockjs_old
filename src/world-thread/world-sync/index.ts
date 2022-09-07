import syncToRenderer from './sync-to-renderer';
import syncToScene from './sync-to-scene';
import WorldContainer from '../WorldContainer';
import Message from '../../shared/utility/Message';
import { SceneMessages } from '../../shared/messages/ThreadMessages';

export function worldSyncAll() {
    syncToRenderer(WorldContainer.getWorld().getChunkIds());

    Message.send(
        SceneMessages.SYNC_WORLD,
        getSceneData(),
        WorldContainer.getScenePort()
    );
}

export default function worldSync(newChunks: string[] = [], removeChunks: string[] = []) {
    syncToRenderer(newChunks, removeChunks);
    syncToScene(newChunks); // ToDo: Unload chunks in Scene
}

function getSceneData() {
    return WorldContainer.getWorld().getChunks().map((chunk) => ({
        changed: chunk.getChanged(),
        id: chunk.getId(),
        blocks: chunk.getBlocks()
    }));
}