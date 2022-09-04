import ThreadManager, { ThreadNames } from './threads/ThreadManager';
import { RenderMessages, WorldMessages } from './threads/ThreadMessages';
import { createEventTunnel } from './create-event-tunnel';
import generateUUID from '../shared/utility/generate-uuid';
import generateSeed from '../shared/utility/generate-seed';
import router from '../user-interface/router';
import { Views } from '../user-interface/router/routes';

function createInstance(canvas: HTMLCanvasElement) {
    const offscreen = canvas.transferControlToOffscreen();

    ThreadManager.createThreads();

    ThreadManager.send(ThreadNames.RENDER, RenderMessages.SET_CANVAS, offscreen, [ offscreen ]);
    ThreadManager.connect(ThreadNames.RENDER, ThreadNames.SCENE);
    ThreadManager.connect(ThreadNames.RENDER, ThreadNames.WORLD);
    ThreadManager.connect(ThreadNames.WORLD, ThreadNames.SCENE);

    createEventTunnel([ ThreadNames.SCENE ]);

    ThreadManager.send(ThreadNames.WORLD, WorldMessages.CREATE, { id: generateUUID(), seed: generateSeed() });

    const worldThread = ThreadManager.get(ThreadNames.WORLD);

    worldThread.onmessage = (event) => {
        if (event.data.action === 'ready') {
            router.push({ name: Views.GAME_DEFAULT, query: event.data.detail });
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