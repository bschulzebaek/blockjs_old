import { BroadcastMessages, GeneralMessages } from '../../../shared/messages/ThreadMessages';
import ThreadNotFoundError from '../../../shared/exceptions/ThreadNotFoundError';
import MessageHandler from '../MessageHandler';

export enum ThreadNames {
    RENDER = 'render',
    RENDER_PIPELINE = 'render-pipeline',
    SCENE = 'scene',
    WORLD = 'world',
}

enum ThreadPaths {
    RENDER = '../../render/RenderThread.ts',
    RENDER_PIPELINE = '../../render-pipeline/RenderPipelineThread.ts',
    SCENE = '../../scene/SceneThread.ts',
    WORLD = '../../world/WorldThread.ts',
}

class ThreadManager {
    private threads: Map<string, Worker> = new Map();
    private channel: Map<string, MessageChannel> = new Map();

    public createThreads() {
        this.threads.set(ThreadNames.RENDER, new Worker(new URL(ThreadPaths.RENDER, import.meta.url), { type: 'module' }));
        this.threads.set(ThreadNames.RENDER_PIPELINE, new Worker(new URL(ThreadPaths.RENDER_PIPELINE, import.meta.url), { type: 'module' }));
        this.threads.set(ThreadNames.SCENE,  new Worker(new URL(ThreadPaths.SCENE,  import.meta.url), { type: 'module' }));
        // this.threads.set(ThreadNames.WORLD,  new Worker(new URL(ThreadPaths.WORLD,  import.meta.url), { type: 'module' }));

        // this.connect(ThreadNames.RENDER, ThreadNames.WORLD);
        // this.connect(ThreadNames.WORLD, ThreadNames.SCENE);
        this.connect(ThreadNames.SCENE, ThreadNames.RENDER_PIPELINE);
        this.connect(ThreadNames.RENDER, ThreadNames.RENDER_PIPELINE);

        this.get(ThreadNames.SCENE).onmessage = MessageHandler.onScenePort;
    }

    public add(name: ThreadNames, worker: Worker) {
        this.threads.set(name, worker);
    }

    public discardThreads() {
        this.broadcast(BroadcastMessages.DISCARD);

        this.threads = new Map();
    }

    public get(name: string) {
        if (!this.threads.has(name)) {
            throw new ThreadNotFoundError(name);
        }

        return this.threads.get(name)!;
    }

    public broadcast(action: BroadcastMessages, detail: any = null, transferable: any[] = []) {
        this.threads.forEach((thread) => {
           thread.postMessage({ action, detail }, transferable);
        });
    }

    public send(name: ThreadNames, action: string, detail: any = null, transferable: any[] = []) {
        this.get(name).postMessage({ action, detail }, transferable);
    }

    public connect(nameA: ThreadNames, nameB: ThreadNames) {
        const channel = new MessageChannel();

        this.send(nameA, GeneralMessages.CONNECT, { thread: nameB, port: channel.port1 }, [ channel.port1 ]);
        this.send(nameB, GeneralMessages.CONNECT, { thread: nameA, port: channel.port2 }, [ channel.port2 ]);

        this.channel.set(`${nameA}-${nameB}`, channel);
    }
}

export default new ThreadManager();