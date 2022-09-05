import { BroadcastMessages, GeneralMessages, RenderMessages } from '../thread-manager/ThreadMessages';
import MessagePayloadInterface from '../thread-manager/MessagePayloadInterface';
import Renderer from './Renderer';

let renderer: Renderer | null = null;

onmessage = (event: MessageEvent<MessagePayloadInterface>) => {
    switch (event.data.action) {
        case GeneralMessages.CONNECT:
            connect(event);
            break;
        case RenderMessages.SET_CANVAS:
            renderer = new Renderer(event.data.detail);
            break;
        case BroadcastMessages.SETUP_CONTAINER:
            break;
        case BroadcastMessages.START:
            renderer?.start();
            break;
        case BroadcastMessages.STOP:
            renderer?.stop();
            break;
        case BroadcastMessages.DISCARD:
            console.log('[RenderThread:discard]');
            self.close();
            break;
        default:
            throw new Error('Unhandled message!');
    }
}

const connect = (event: MessageEvent<MessagePayloadInterface>) => {
    switch (event.data.detail.thread) {
        case 'scene':
            event.ports[0].onmessage = sceneHandler;
            break;
        case 'world':
            event.ports[0].onmessage = worldHandler;
            break;
        default:
            throw new Error('Unhandled connection!');
    }
}

const sceneHandler = (event: MessageEvent<MessagePayloadInterface>) => {
    switch (event.data.action) {
        case RenderMessages.SYNC_SCENE:
            renderer?.syncSceneObjects(event.data.detail);
            break;
        default:
            throw new Error('Unhandled message!');
    }
}

const worldHandler = (event: MessageEvent<MessagePayloadInterface>) => {
    switch (event.data.action) {
        case RenderMessages.SYNC_WORLD:
            renderer?.syncWorld(event.data.detail);
            break;
        default:
            throw new Error('Unhandled message!');
    }
}