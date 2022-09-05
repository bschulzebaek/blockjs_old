import { BroadcastMessages, GeneralMessages } from './ThreadMessages';
import spawnThread from './spawn-thread';

export enum ThreadNames {
    RENDER = 'render',
    SCENE = 'scene',
    WORLD = 'world',
}

class ThreadManager {

    private threads: Map<string, Worker> = new Map();
    private channel: Map<string, MessageChannel> = new Map();

    public createThreads() {
        this.threads.set(ThreadNames.RENDER, spawnThread('../render-thread/RenderThread.ts'));
        this.threads.set(ThreadNames.SCENE,  spawnThread('../scene-thread/SceneThread.ts'));
        this.threads.set(ThreadNames.WORLD,  spawnThread('../world-thread/WorldThread.ts'));

        this.connect(ThreadNames.RENDER, ThreadNames.SCENE);
        this.connect(ThreadNames.RENDER, ThreadNames.WORLD);
        this.connect(ThreadNames.WORLD, ThreadNames.SCENE);
    }

    public discardThreads() {
        this.broadcast(BroadcastMessages.DISCARD);

        this.threads = new Map();
    }

    public get(name: string) {
        if (!this.threads.has(name)) {
            throw new Error(name);
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