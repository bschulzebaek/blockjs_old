import { BroadcastMessages, GeneralMessages, SceneMessages, WorldMessages } from '../thread-manager/ThreadMessages';
import MessagePayloadInterface from '../thread-manager/MessagePayloadInterface';
import WorldService from './WorldService';
import WorldContainer from './WorldContainer';

const worldService = new WorldService();

onmessage = (event: MessageEvent<MessagePayloadInterface>) => {
    switch (event.data.action) {
        case GeneralMessages.CONNECT:
            connect(event);
            break;
        case BroadcastMessages.SETUP_CONTAINER:
            WorldContainer.setConfig(event.data.detail);
            break;
        case BroadcastMessages.START:
            worldService.sync();
            break;
        case BroadcastMessages.STOP:
            break;
        case WorldMessages.CREATE:
            worldService.create();
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
            WorldContainer.setRenderPort(event.ports[0]);
            break;
        case 'scene':
            event.ports[0].onmessage = sceneHandler;
            WorldContainer.setScenePort(event.ports[0]);
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
        case SceneMessages.REQUEST_WORLD_CHANGE:
            const { x, y, z, id } = event.data.detail;
            worldService.setBlockId(x, y, z, id);
            break;
        default:
            throw new Error('Unhandled message!');
    }
}