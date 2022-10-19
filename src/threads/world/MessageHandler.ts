import MessagePayloadInterface from '../../shared/messages/MessagePayloadInterface';
import { BroadcastMessages, GeneralMessages, WorldMessages } from '../../shared/messages/ThreadMessages';
import UnhandledMessageError from '../../shared/exceptions/UnhandledMessageError';
import WorldContainer from './WorldContainer';

export default class MessageHandler {
    static onMessage(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.action) {
            case GeneralMessages.CONNECT:
                MessageHandler.onConnect(event);
                break;
            case BroadcastMessages.SETUP_CONTAINER:
                WorldContainer.setConfig(event.data.detail);
                break;
            case BroadcastMessages.START:
                break;
            case BroadcastMessages.STOP:
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
            case 'render':
                WorldContainer.setRenderPort(event.ports[0]);
                break;
            case 'scene':
                WorldContainer.setScenePort(event.ports[0]);
                event.ports[0].onmessage = MessageHandler.onScenePort;
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static onScenePort(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.action) {
            case WorldMessages.IN_CREATE_CHUNKS:
                WorldContainer.getWorldService().createChunks(event.data.detail);
                break;
            case WorldMessages.IN_DISCARD_CHUNKS:
                WorldContainer.getWorldService().discardChunks(event.data.detail);
                break;
            case WorldMessages.IN_UPDATE_CHUNK:
                WorldContainer.getWorldService().updateChunk(event.data.detail);
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static onSubMessage(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.action) {
            case WorldMessages.SUB_TERMINATED:
                WorldContainer.getWorldService().onSubTermination(event.data.detail);
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static async onClose() {
        console.debug('[WorldThread:discard]');
        self.close();
    }
}