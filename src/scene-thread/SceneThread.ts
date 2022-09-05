import { BroadcastMessages, GeneralMessages, SceneMessages, WorldMessages } from '../thread-manager/ThreadMessages';
import MessagePayloadInterface from '../thread-manager/MessagePayloadInterface';
import SceneContainer from './SceneContainer';

// @ts-ignore
self.__CONTAINER__ = SceneContainer;

onmessage = (event: MessageEvent<MessagePayloadInterface>) => {
    switch (event.data.action) {
        case GeneralMessages.CONNECT:
            connect(event);
            break;
        case GeneralMessages.INPUT_EVENT:
            inputHandler(event);
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
            SceneContainer.discard();
            break;
        default:
            throw new Error('Unhandled message!');
    }
}

const connect = (event: MessageEvent<MessagePayloadInterface>) => {
    switch (event.data.detail.thread) {
        case 'render':
            SceneContainer.setRenderPort(event.ports[0]);
            break;
        case 'world':
            SceneContainer.setWorldPort(event.ports[0]);
            event.ports[0].onmessage = worldHandler;
            break;
        default:
            throw new Error('Unhandled connection!');
    }
}

const inputHandler = (event: MessageEvent<MessagePayloadInterface>) => {
    const { detail } = event.data;

    dispatchEvent(new CustomEvent(detail.type, { detail }));
}

const worldHandler = (event: MessageEvent<MessagePayloadInterface>) => {
    switch (event.data.action) {
        case WorldMessages.READY:
            SceneContainer.createScene();
            break;
        case SceneMessages.SYNC_WORLD:
            SceneContainer.getWorld().setChunks(event.data.detail);
            break;
        default:
            throw new Error('Unhandled message!');
    }
}