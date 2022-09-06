import MessagePayloadInterface from '../../shared/messages/MessagePayloadInterface';
import { BroadcastMessages, GeneralMessages, SceneMessages, WorldMessages } from '../../shared/messages/ThreadMessages';
import SceneContainer from '../SceneContainer';
import UnhandledMessageError from '../../shared/exceptions/UnhandledMessageError';
import logger from '../../shared/utility/logger';

export default class MessageHandler {
    static onMessage(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.action) {
            case GeneralMessages.CONNECT:
                MessageHandler.onConnect(event);
                break;
            case GeneralMessages.INPUT_EVENT:
                MessageHandler.onInput(event);
                break;
            case BroadcastMessages.SETUP_CONTAINER:
                SceneContainer.setConfig(event.data.detail);
                break;
            case BroadcastMessages.START:
                SceneContainer.getScene().start();
                break;
            case BroadcastMessages.STOP:
                SceneContainer.getScene().stop();
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
                SceneContainer.setRenderPort(event.ports[0]);
                break;
            case 'world':
                SceneContainer.setWorldPort(event.ports[0]);
                event.ports[0].onmessage = MessageHandler.onWorldPort;
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static onWorldPort(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.action) {
            case WorldMessages.READY:
                SceneContainer.createScene();
                break;
            case SceneMessages.SYNC_WORLD:
                SceneContainer.getWorld().setChunks(event.data.detail);
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static onInput(event: MessageEvent<MessagePayloadInterface>) {
        const { detail } = event.data;

        dispatchEvent(new CustomEvent(detail.type, { detail }));
    }

    static async onClose() {
        logger('[SceneThread:discard]');
        await SceneContainer.getEntityService().save();
        self.close();
    }
}