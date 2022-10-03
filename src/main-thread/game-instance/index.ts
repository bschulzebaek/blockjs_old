import ThreadManager, { ThreadNames } from './ThreadManager';
import { BroadcastMessages, RenderMessages, SceneMessages } from '../../shared/messages/ThreadMessages';
import GameConfigService from '../game-config/GameConfigService';
import MainContainer from '../MainContainer';
import onSceneThreadMessage from './on-scene-thread-message';
import CanvasNotFoundError from '../../shared/exceptions/CanvasNotFoundError';
import ConfigNotFoundError from '../../shared/exceptions/ConfigNotFoundError';
import MainThread from '../MainThread';

async function createInstance() {
    const canvas = MainContainer.getCanvas(),
          config = MainContainer.getStore().config;

    if (!canvas) {
        throw new CanvasNotFoundError();
    }

    if (!config) {
        throw new ConfigNotFoundError();
    }

    const gameConfigService = new GameConfigService(config),
          gameConfig = await gameConfigService.getConfig(),
          offscreen = canvas.transferControlToOffscreen();

    await MainThread.create(gameConfig);

    ThreadManager.createThreads();

    ThreadManager.broadcast(BroadcastMessages.SETUP_CONTAINER, {
        ...gameConfig.getRaw(),
        isNew: gameConfig.getIsNew(),
    });

    ThreadManager.get(ThreadNames.SCENE).onmessage = onSceneThreadMessage;

    ThreadManager.send(ThreadNames.RENDER, RenderMessages.SET_CANVAS, offscreen, [ offscreen ]);
    ThreadManager.send(ThreadNames.SCENE, SceneMessages.CREATE);
}

async function discardInstance() {
    ThreadManager.discardThreads();
    await MainThread.discard();
}

export {
    createInstance,
    discardInstance
}