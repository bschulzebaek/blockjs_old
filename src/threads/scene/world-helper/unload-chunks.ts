import SceneContainer from '../SceneContainer';
import syncRenderObject, { SyncAction } from '../helper/sync-render-object';
import { WorldMessages } from '../../../shared/messages/ThreadMessages';
import Message from '../../../shared/utility/Message';

enum ChunkSuffix {
    GLASS = '-glass',
    SOLID = '-solid',
}

export default function unloadChunks(ids: string[]) {
    const world = SceneContainer.getWorld();
    const port = SceneContainer.getRenderPipelinePort();

    Message.send(
        WorldMessages.IN_DISCARD_CHUNKS,
        ids,
        SceneContainer.getWorldPort(),
    );

    ids.forEach((id) => {
        world.popChunk(id);

        syncRenderObject(
            port,
            SyncAction.DELETE,
            `${id}${ChunkSuffix.GLASS}`,
        );

        syncRenderObject(
            port,
            SyncAction.DELETE,
            `${id}${ChunkSuffix.SOLID}`,
        );
    });
}