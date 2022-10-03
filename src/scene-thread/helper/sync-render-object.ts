import Message from '../../shared/utility/Message';
import { RenderPipelineMessages } from '../../shared/messages/ThreadMessages';
import SceneContainer from '../SceneContainer';

export enum SyncAction {
    UPSERT = 'UPSERT',
    DELETE = 'DELETE',
}

function getMessageType(action: SyncAction) {
    if (action === SyncAction.DELETE) {
        return RenderPipelineMessages.DELETE_RENDER_OBJECT;
    } else if (action === SyncAction.UPSERT) {
        return RenderPipelineMessages.UPSERT_RENDER_OBJECT;
    } else {
        throw new Error('Unhandled SyncAction!');
    }
}

export default function syncRenderObject(action: SyncAction, id: string, data?: any, transferable?: Transferable[]) {
    const messageType = getMessageType(action);

    Message.send(
        messageType,
        {
            id,
            payload: data,
        },
        SceneContainer.getRenderPipelinePort(),
        transferable,
    );
}