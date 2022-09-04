import { BroadcastMessages, GeneralMessages } from './ThreadMessages';

export enum ThreadNames {
    RENDER = 'render',
    SCENE = 'scene',
    WORLD = 'world',
}

class ThreadManager {

    private threads: Map<string, Worker> = new Map();
    private channel: Map<string, MessageChannel> = new Map();

    constructor() {

    }

    public createThreads() {
        this.threads.set(ThreadNames.RENDER, new Worker(new URL('./RenderThread.ts', import.meta.url), { type: 'module' }));
        this.threads.set(ThreadNames.SCENE, new Worker(new URL('./SceneThread.ts', import.meta.url), { type: 'module' }));
        this.threads.set(ThreadNames.WORLD, new Worker(new URL('./WorldThread.ts', import.meta.url), { type: 'module' }));
    }

    public discardThreads() {
        this.broadcast(BroadcastMessages.DISCARD);

        this.threads = new Map();
    }

    public get(name: string) {
        if (!this.threads.has(name)) {
            throw new Error();
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