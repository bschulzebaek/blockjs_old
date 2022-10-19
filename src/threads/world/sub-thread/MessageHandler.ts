import MessagePayloadInterface from '../../../shared/messages/MessagePayloadInterface';
import { BroadcastMessages, GeneralMessages, WorldMessages } from '../../../shared/messages/ThreadMessages';
import WorldSubContainer from './WorldSubContainer';
import UnhandledMessageError from '../../../shared/exceptions/UnhandledMessageError';

export default class MessageHandler {
    static onMessage(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.action) {
            case GeneralMessages.CONNECT:
                MessageHandler.onConnect(event);
                break;
            case BroadcastMessages.SETUP_CONTAINER:
                WorldSubContainer.setConfig(event.data.detail);
                break;
            case WorldMessages.IN_CREATE_CHUNKS:
                WorldSubContainer.getWorldSubService().createChunks(event.data.detail);
                break;
            case WorldMessages.IN_DISCARD_CHUNKS:
                WorldSubContainer.getWorldSubService().discardChunks(event.data.detail);
                break;
            case WorldMessages.IN_UPDATE_CHUNK:
                WorldSubContainer.getWorldSubService().updateChunk(event.data.detail);
                break;
            case WorldMessages.IN_UPDATE_CHUNKS:
                WorldSubContainer.getWorldSubService().updateChunks(event.data.detail);
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static onConnect(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.detail.thread) {
            case 'render-pipeline':
                WorldSubContainer.setRenderPort(event.ports[0]);
                break;
            case 'scene':
                WorldSubContainer.setScenePort(event.ports[0]);
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static async onClose() {
        console.debug('[WorldSubThread:discard]');
        self.close();
    }
}