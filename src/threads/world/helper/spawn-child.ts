import WorldContainer from '../WorldContainer';
import { BroadcastMessages, GeneralMessages, WorldMessages } from '../../../shared/messages/ThreadMessages';
import generateUUID from '../../../shared/utility/generate-uuid';
import MessageHandler from '../MessageHandler';

// @ts-ignore
import SubThread from '../sub-thread/WorldSubThread?worker';

// const WORKER_PATH = '../sub-thread/WorldSubThread.ts';

export default function spawnChild(batch: string[]) {
    const name = generateUUID(),
        worker = new SubThread();

    // ToDo: Should use the following approach to provide a Worker name! https://github.com/vitejs/vite/issues/9879

    // const worker = new Worker(new URL(WORKER_PATH, import.meta.url), {
    //     type: 'module',
    //     name,
    // });

    connectScene(worker);
    connectRenderPipeline(worker);

    worker.postMessage({
        action: BroadcastMessages.SETUP_CONTAINER,
        detail: WorldContainer.getConfig().getRaw(),
    });

    worker.postMessage({
        action: WorldMessages.IN_CREATE_CHUNK,
        detail: batch,
    });

    WorldContainer.addWorker(name, worker, batch);

    worker.onmessage = MessageHandler.onSubMessage;
}

function connectScene(worker: Worker) {
    const sceneChannel = new MessageChannel()

    WorldContainer.getScenePort().postMessage({
        action: GeneralMessages.CONNECT,
        detail: {
            thread: 'world-helper',
            port: sceneChannel.port1,
        },
    }, [ sceneChannel.port1 ]);

    worker.postMessage({
        action: GeneralMessages.CONNECT,
        detail: {
            thread: 'scene',
            action: sceneChannel.port2,
        },
    }, [ sceneChannel.port2 ]);
}

function connectRenderPipeline(worker: Worker) {
    const renderPipelineChannel = new MessageChannel();

    WorldContainer.getRenderPipelinePort().postMessage({
        action: GeneralMessages.CONNECT,
        detail: {
            thread: 'world-helper',
            port: renderPipelineChannel.port1,
        },
    }, [ renderPipelineChannel.port1 ]);

    worker.postMessage({
        action: GeneralMessages.CONNECT,
        detail: {
            thread: 'render-pipeline',
            action: renderPipelineChannel.port2,
        },
    }, [ renderPipelineChannel.port2 ]);
}