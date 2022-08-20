import StorageAdapter from './storage/StorageAdapter';
import GameConfigService from './game-config/GameConfigService';
import EntityService from './entity/EntityService';

import Fullscreen from '../utility/Fullscreen';
import generateUUID from '../utility/generate-uuid';
import generateSeed from '../utility/generate-seed';
import SceneService from './scene/SceneService';
import RendererService from './renderer/RendererService';

interface SetupInterface {
    id?: string;
    name?: string;
    seed?: string;
}

export const DEFAULT_NAME = 'New World';

export enum ServiceName {
    GAME_CONFIG = 'gameConfig',
    ENTITY = 'entity',
    SCENE = 'scene',
    RENDERER = 'renderer',
}

class Container {
    private storageAdapter?: StorageAdapter;

    private services: {
        gameConfigService?: GameConfigService,
        entityService?: EntityService,
        sceneService?: SceneService,
        rendererService?: RendererService,
    } = {
        gameConfigService: undefined,
        entityService: undefined,
        sceneService: undefined,
        rendererService: undefined,
    };

    getService(name: ServiceName.ENTITY): EntityService
    getService(name: ServiceName.GAME_CONFIG): GameConfigService
    getService(name: ServiceName.SCENE): SceneService
    getService(name: ServiceName.RENDERER): RendererService
    getService(name: ServiceName) {
        switch (name) {
            case ServiceName.ENTITY:
                return this.services.entityService;
            case ServiceName.GAME_CONFIG:
                return this.services.gameConfigService;
            case ServiceName.RENDERER:
                return this.services.rendererService;
            case ServiceName.SCENE:
                return this.services.sceneService;
        }
    }

    public async setup(setupData: SetupInterface): Promise<void> {
        if (setupData.id) {
            await this.load(setupData.id);
        } else {
            await this.new(setupData.name ?? DEFAULT_NAME, setupData.seed ?? generateSeed());
        }
    }

    public async teardown(): Promise<void> {
        await Promise.all([
            this.services.gameConfigService?.discard(),
            this.services.rendererService?.discard(),
            this.services.sceneService?.discard(),
            this.services.entityService?.discard(),
        ]);

        this.services = {};
        delete this.storageAdapter;

        Fullscreen.exit();
    }

    private async new(name: string, seed: string) {
        const id = generateUUID();
        await this.createServices(id, true);

        await Promise.all([
            this.services.gameConfigService?.create(id, name, seed),
            this.services.sceneService?.create(),
            this.services.entityService?.createPlayer(),

            this.services.rendererService?.create(),
        ]);
    }

    private async load(id: string): Promise<void> {
        await this.createServices(id, false);

        await Promise.all([
            this.services.gameConfigService?.load(),
            this.services.sceneService?.create(),
            this.services.entityService?.getAll(),

            this.services.rendererService?.create(),
        ]);
    }

    private async createServices(id: string, isNew: boolean) {
        this.storageAdapter = new StorageAdapter(id);

        if (isNew) {
            await this.storageAdapter.createDefaultStorage();
        }

        this.services.gameConfigService = new GameConfigService(this.storageAdapter);
        this.services.sceneService = new SceneService(this.storageAdapter);
        this.services.entityService = new EntityService(this.storageAdapter);
        this.services.rendererService = new RendererService();
    }
}

export default new Container();