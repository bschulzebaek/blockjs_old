import ThreadManager, { ThreadNames } from './threads/ThreadManager';
import { RenderMessages, WorldMessages } from './threads/ThreadMessages';
import { createEventTunnel } from './create-event-tunnel';
import router from '../user-interface/router';
import { Views } from '../user-interface/router/routes';
import RawGameConfigInterface from './game-config/RawGameConfigInterface';
import GameConfigService from './game-config/GameConfigService';

async function createInstance(canvas: HTMLCanvasElement, config: RawGameConfigInterface) {
    const gameConfigService = new GameConfigService(config),
          gameConfig = await gameConfigService.getConfig(),
          offscreen = canvas.transferControlToOffscreen();

    ThreadManager.createThreads();

    ThreadManager.send(ThreadNames.RENDER, RenderMessages.SET_CANVAS, offscreen, [ offscreen ]);
    ThreadManager.connect(ThreadNames.RENDER, ThreadNames.SCENE);
    ThreadManager.connect(ThreadNames.RENDER, ThreadNames.WORLD);
    ThreadManager.connect(ThreadNames.WORLD, ThreadNames.SCENE);

    createEventTunnel([ ThreadNames.SCENE ]);

    ThreadManager.send(ThreadNames.WORLD, WorldMessages.CREATE, {
        id: gameConfig.getId(),
        seed: gameConfig.getSeed(),
        isNew: typeof config.isNew !== 'undefined',
    });

    const worldThread = ThreadManager.get(ThreadNames.WORLD);

    worldThread.onmessage = (event) => {
        if (event.data.action === 'ready') {
            router.push({ name: Views.GAME_DEFAULT });
        }
    }
}

async function discardInstance() {
    ThreadManager.discardThreads();
}

export {
    createInstance,
    discardInstance
}