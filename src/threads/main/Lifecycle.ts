import Fullscreen from './helper/Fullscreen';
import { discardSceneEventTunnel } from './helper/create-event-tunnel';
import { Views } from '../../data/views';
import { ApplicationStoreInterface } from '../../user-interface/store';
import { Router } from 'vue-router';
import CanvasNotFoundError from '../../shared/exceptions/CanvasNotFoundError';
import ConfigNotFoundError from '../../shared/exceptions/ConfigNotFoundError';
import WorldConfigService from '../../components/world-config/WorldConfigService';
import ThreadManager, { ThreadNames } from './thread-manager/ThreadManager';
import { BroadcastMessages, RenderMessages, SceneMessages } from '../../shared/messages/ThreadMessages';
import Container from './Container';
import setupInitialData from './helper/setup-initial-data';

export default class Lifecycle {
    static async create(store: ApplicationStoreInterface, router: Router) {
        await Fullscreen.enter();

        Container.setup(store, router);

        const canvas = Container.getCanvas(),
              config = Container.getStore().config;

        if (!canvas) {
            throw new CanvasNotFoundError();
        }

        if (!config) {
            throw new ConfigNotFoundError();
        }

        const worldConfigService = new WorldConfigService(config),
              worldConfig = await worldConfigService.getConfig(),
              offscreen = canvas.transferControlToOffscreen();

        Container.setConfig(worldConfig);

        if (worldConfig.getIsNew()) {
            await setupInitialData(worldConfig);
        }

        ThreadManager.createThreads();
        ThreadManager.broadcast(BroadcastMessages.SETUP_CONTAINER, {
            ...worldConfig.getRaw(),
            isNew: worldConfig.getIsNew(),
        });
        ThreadManager.send(ThreadNames.RENDER, RenderMessages.SET_CANVAS, offscreen, [ offscreen ]);
        ThreadManager.send(ThreadNames.SCENE, SceneMessages.CREATE);
    }

    static async discard() {
        Fullscreen.exit();
        discardSceneEventTunnel();

        Container.getStateMachine().pushTransition(Views.MAIN_MENU);
        Container.reset();
        ThreadManager.discardThreads();
    }
}