import MessagePayloadInterface from '../../shared/messages/MessagePayloadInterface';
import {
    BroadcastMessages,
    GeneralMessages,
    SceneMessages, WorldMessages,
} from '../../shared/messages/ThreadMessages';
import SceneContainer from './SceneContainer';
import UnhandledMessageError from '../../shared/exceptions/UnhandledMessageError';
import createInstance from './lifecycle/create-instance';
import Message from '../../shared/utility/Message';
import discardInstance from './lifecycle/discard-instance';
import onChunkReady from './world-helper/on-chunk-ready';

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
                discardInstance();
                break;
            case SceneMessages.CREATE:
                createInstance();
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static onConnect(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.detail.thread) {
            case 'render-pipeline':
                SceneContainer.setRenderPipelinePort(event.ports[0]);
                break;
            case 'world':
                SceneContainer.setWorldPort(event.ports[0]);
                event.ports[0].onmessage = MessageHandler.onWorldPort;
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static onInput(event: MessageEvent<MessagePayloadInterface>) {
        const { detail } = event.data;

        dispatchEvent(new CustomEvent(detail.type, { detail }));
    }

    static onWorldPort(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.action) {
            case WorldMessages.OUT_CHUNK_READY:
                onChunkReady(event.data.detail);
                break;
            case GeneralMessages.CONNECT:
                event.ports[0].onmessage = MessageHandler.onWorldPort;
                break;
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static dispatchReady() {
        Message.send(SceneMessages.READY);
    }
}