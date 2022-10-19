import MessagePayloadInterface from '../../shared/messages/MessagePayloadInterface';
import { BroadcastMessages, GeneralMessages, RenderMessages } from '../../shared/messages/ThreadMessages';
import Renderer from './Renderer';
import UnhandledMessageError from '../../shared/exceptions/UnhandledMessageError';
import RenderContainer from './RenderContainer';

export default class MessageHandler {
    static onMessage(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.action) {
            case GeneralMessages.CONNECT:
                MessageHandler.onConnect(event);
                break;
            case RenderMessages.SET_CANVAS:
                RenderContainer.setRenderer(new Renderer(event.data.detail));
                break;
            case BroadcastMessages.SETUP_CONTAINER:
                break;
            case BroadcastMessages.START:
                RenderContainer.getRenderer().start();
                break;
            case BroadcastMessages.STOP:
                RenderContainer.getRenderer().stop();
                break;
            case BroadcastMessages.DISCARD:
                MessageHandler.onClose();
                break;
            case RenderMessages.SET_DRAW_MODE:
                RenderContainer.toggleWireframe();
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static onConnect(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.detail.thread) {
            case 'render-pipeline':
                event.ports[0].onmessage = MessageHandler.onRenderPipelinePort;
                break;
            case 'world':
                event.ports[0].onmessage = MessageHandler.onWorldPort;
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static onRenderPipelinePort(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.action) {
            case RenderMessages.SYNC_CAMERA:
                RenderContainer.getRenderService().syncCamera(event.data.detail);
                break;
            case RenderMessages.DELETE_RENDER_OBJECT:
                RenderContainer.getRenderService().delete(event.data.detail);
                break;
            case RenderMessages.UPSERT_RENDER_OBJECT:
                RenderContainer.getRenderService().upsert(event.data.detail);
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static onWorldPort(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.detail.thread) {
            case 'world-helper':
                event.ports[0].onmessage = MessageHandler.onWorldHelper;
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static onWorldHelper(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.action) {
            case RenderMessages.UPSERT_RENDER_OBJECT:
                RenderContainer.getRenderService().upsertChunk(event.data.detail);
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static async onClose() {
        console.debug('[RenderThread:discard]');
        self.close();
    }
}