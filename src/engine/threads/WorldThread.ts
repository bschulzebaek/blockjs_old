import { BroadcastMessages, GeneralMessages, SceneMessages, WorldMessages } from './ThreadMessages';
import MessagePayloadInterface from './MessagePayloadInterface';
import WorldService from '../../world/WorldService';

const worldService = new WorldService();

onmessage = (event: MessageEvent<MessagePayloadInterface>) => {
    switch (event.data.action) {
        case GeneralMessages.CONNECT:
            connect(event);
            break;
        case BroadcastMessages.START:
            worldService.sync();
            break;
        case BroadcastMessages.STOP:
            break;
        case WorldMessages.CREATE:
            worldService.create(event.data.detail);
            break;
        case BroadcastMessages.DISCARD:
            console.log('[WorldThread:discard]');
            self.close();
            break;
        default:
            throw new Error('Unhandled message!');
    }
}

const connect = (event: MessageEvent<MessagePayloadInterface>) => {
    switch (event.data.detail.thread) {
        case 'render':
            worldService.setRenderPort(event.ports[0]);
            break;
        case 'scene':
            event.ports[0].onmessage = sceneHandler;
            worldService.setScenePort(event.ports[0]);
            break;
        default:
            throw new Error('Unhandled connection!');
    }
}

const sceneHandler = (event: MessageEvent<MessagePayloadInterface>) => {
    switch (event.data.action) {
        case SceneMessages.REQUEST_WORLD_UPDATE:
            worldService.updateChunkGrid(event.data.detail);
            break;
        default:
            throw new Error('Unhandled message!');
    }
}