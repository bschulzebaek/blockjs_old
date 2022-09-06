import MessagePayloadInterface from '../../shared/messages/MessagePayloadInterface';
import { BroadcastMessages, GeneralMessages, SceneMessages, WorldMessages } from '../../shared/messages/ThreadMessages';
import logger from '../../shared/utility/logger';
import UnhandledMessageError from '../../shared/exceptions/UnhandledMessageError';
import WorldContainer from '../WorldContainer';
import Message from '../../shared/utility/Message';
import setBlock from '../world-access/set-block';
import worldSync from '../world-sync';

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
                worldSync();
                break;
            case BroadcastMessages.STOP:
                break;
            case WorldMessages.CREATE:
                WorldContainer.getWorldService().create();
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
                event.ports[0].onmessage = MessageHandler.onScenePort;
                WorldContainer.setScenePort(event.ports[0]);
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static onScenePort(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.action) {
            case SceneMessages.REQUEST_WORLD_UPDATE:
                WorldContainer.getWorldService().updateChunkGrid(event.data.detail);
                break;
            case SceneMessages.REQUEST_WORLD_CHANGE:
                const { x, y, z, id } = event.data.detail;
                setBlock(x, y, z, id);
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static async onClose() {
        logger('[WorldThread:discard]');
        self.close();
    }

    static dispatchReady() {
        Message.send(WorldMessages.READY, null, WorldContainer.getScenePort());
        Message.send(WorldMessages.READY);
    }
}