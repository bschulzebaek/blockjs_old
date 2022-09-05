import ThreadManager, { ThreadNames } from './ThreadManager';
import { BroadcastMessages, RenderMessages, WorldMessages } from './ThreadMessages';
import RawGameConfigInterface from '../main-thread/game-config/RawGameConfigInterface';
import GameConfigService from '../main-thread/game-config/GameConfigService';
import StateMachine from '../main-thread/StateMachine';
import MainContainer from '../main-thread/MainContainer';
import createPlayerEntity from '../main-thread/helper/create-player-entity';
import onSceneThreadMessage from '../main-thread/scene-thread-message';

async function createInstance(canvas: HTMLCanvasElement, config: RawGameConfigInterface) {
    const gameConfigService = new GameConfigService(config),
          gameConfig = await gameConfigService.getConfig(),
          offscreen = canvas.transferControlToOffscreen();

    if (gameConfig.getIsNew()) {
        await createPlayerEntity(gameConfig.getId());
    }

    ThreadManager.createThreads();

    ThreadManager.broadcast(BroadcastMessages.SETUP_CONTAINER, {
        ...gameConfig.getRaw(),
        isNew: gameConfig.getIsNew(),
    });

    await MainContainer.create(gameConfig);

    ThreadManager.send(ThreadNames.RENDER, RenderMessages.SET_CANVAS, offscreen, [ offscreen ]);

    ThreadManager.send(ThreadNames.WORLD, WorldMessages.CREATE);

    ThreadManager.get(ThreadNames.WORLD).onmessage = (event) => {
        if (event.data.action === 'ready') {
            StateMachine.on_InstanceReady();
        }
    }

    ThreadManager.get(ThreadNames.SCENE).onmessage = onSceneThreadMessage;
}

async function discardInstance() {
    ThreadManager.discardThreads();
    MainContainer.discard();
}

export {
    createInstance,
    discardInstance
}