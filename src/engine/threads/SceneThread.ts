import { BroadcastMessages, GeneralMessages, SceneMessages } from './ThreadMessages';
import MessagePayloadInterface from './MessagePayloadInterface';
import SceneContainer from '../../scene/SceneContainer';

onmessage = (event: MessageEvent<MessagePayloadInterface>) => {
    switch (event.data.action) {
        case GeneralMessages.CONNECT:
            connect(event);
            break;
        case GeneralMessages.INPUT_EVENT:
            inputHandler(event);
            break;
        case BroadcastMessages.START:
            SceneContainer.getScene().start(event.data.detail);
            break;
        case BroadcastMessages.STOP:
            SceneContainer.getScene().stop();
            break;
        case BroadcastMessages.DISCARD:
            console.log('[SceneThread:discard]');
            self.close();
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
        case SceneMessages.SYNC_WORLD:
            SceneContainer.getScene().syncWorld(event.data.detail);
            break;
        default:
            throw new Error('Unhandled message!');
    }
}