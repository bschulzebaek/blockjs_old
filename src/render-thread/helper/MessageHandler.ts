import MessagePayloadInterface from '../../shared/messages/MessagePayloadInterface';
import { BroadcastMessages, GeneralMessages, RenderMessages } from '../../shared/messages/ThreadMessages';
import Renderer from '../Renderer';
import logger from '../../shared/utility/logger';
import UnhandledMessageError from '../../shared/exceptions/UnhandledMessageError';
import RenderContainer from '../RenderContainer';

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
                default:
                    throw new UnhandledMessageError(event.data.action);
            }
        }

    static onConnect(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.detail.thread) {
            case 'scene':
                event.ports[0].onmessage = MessageHandler.onScenePort;
                break;
            case 'world':
                event.ports[0].onmessage = MessageHandler.onWorldPort;
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static onScenePort(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.action) {
            case RenderMessages.SYNC_SCENE:
                RenderContainer.getRenderer().syncSceneObjects(event.data.detail);
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static onWorldPort(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.action) {
            case RenderMessages.SYNC_CHUNK:
                RenderContainer.getRenderer().syncChunk(event.data.detail);
                break;
            case RenderMessages.POP_CHUNKS:
                RenderContainer.getRenderer().removeChunks(event.data.detail);
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static async onClose() {
        logger('[RenderThread:discard]');
        self.close();
    }
}