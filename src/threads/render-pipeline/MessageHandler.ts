import MessagePayloadInterface from '../../shared/messages/MessagePayloadInterface';
import {
    BroadcastMessages,
    GeneralMessages,
    RenderMessages,
} from '../../shared/messages/ThreadMessages';
import UnhandledMessageError from '../../shared/exceptions/UnhandledMessageError';
import RenderPipelineContainer from './RenderPipelineContainer';
import RenderPipelineService from './RenderPipelineService';

export default class MessageHandler {
    static onMessage(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.action) {
            case GeneralMessages.CONNECT:
                MessageHandler.onConnect(event);
                break;
            case BroadcastMessages.DISCARD:
                MessageHandler.onClose();
                break;
        }
    }

    static onConnect(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.detail.thread) {
            case 'render':
                RenderPipelineContainer.setRenderPort(event.ports[0]);
                break;
            case 'scene':
                RenderPipelineContainer.setScenePort(event.ports[0]);
                event.ports[0].onmessage = MessageHandler.onScenePort;
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static onScenePort(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.action) {
            case RenderMessages.DELETE_RENDER_OBJECT:
                RenderPipelineService.delete(event.data.detail);
                break;
            case RenderMessages.UPSERT_RENDER_OBJECT:
                RenderPipelineService.upsert(event.data.detail);
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static async onClose() {
        console.debug('[RenderPipelineThread:discard]');
        self.close();
    }
}