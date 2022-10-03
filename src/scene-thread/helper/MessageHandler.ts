import MessagePayloadInterface from '../../shared/messages/MessagePayloadInterface';
import { BroadcastMessages, GeneralMessages, SceneMessages } from '../../shared/messages/ThreadMessages';
import SceneContainer from '../SceneContainer';
import UnhandledMessageError from '../../shared/exceptions/UnhandledMessageError';
import createInstance from '../lifecycle/create-instance';
import Message from '../../shared/utility/Message';
import discardInstance from '../lifecycle/discard-instance';

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
            default:
                throw new UnhandledMessageError(event.data.action);
        }
    }

    static onInput(event: MessageEvent<MessagePayloadInterface>) {
        const { detail } = event.data;

        dispatchEvent(new CustomEvent(detail.type, { detail }));
    }
    static dispatchReady() {
        Message.send(SceneMessages.READY);
    }
}