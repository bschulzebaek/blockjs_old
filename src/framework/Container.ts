import StorageAdapter from './storage/StorageAdapter';
import GameConfigService from './game-config/GameConfigService';
import EntityService from './entity/EntityService';

import Fullscreen from '../utility/Fullscreen';
import generateUUID from '../utility/generate-uuid';
import generateSeed from '../utility/generate-seed';
import SceneService from './scene/SceneService';
import RendererService from './renderer/RendererService';
import prepareCanvas from '../utility/prepare-canvas';
import WorldService from './world/WorldService';
import PlayerController from './player/PlayerController';

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
    PLAYER = 'player',
    WORLD = 'world',
}

class Container {
    private storageAdapter?: StorageAdapter;
    private context?: WebGL2RenderingContext;

    private services: {
        gameConfig?: GameConfigService,
        entity?: EntityService,
        scene?: SceneService,
        renderer?: RendererService,
        world?: WorldService,
    } = {
        gameConfig: undefined,
        entity: undefined,
        scene: undefined,
        renderer: undefined,
        world: undefined,
    };

    public getContext(): WebGL2RenderingContext {
        return this.context as WebGL2RenderingContext;
    }

    public isRunning(): boolean {
        if (!Object.keys(this.services).length) {
            return false;
        }

        return this.getService(ServiceName.RENDERER).isRunning();
    }

    public async play(canvas: HTMLCanvasElement) {
        const sceneService    = this.getService(ServiceName.SCENE),
              worldService    = this.getService(ServiceName.WORLD),
              rendererService = this.getService(ServiceName.RENDERER);

        this.context = canvas.getContext('webgl2') as WebGL2RenderingContext;

        prepareCanvas(canvas);

        sceneService.beforePlay();
        worldService.beforePlay();

        rendererService.start();
    }

    public pause() {
        this.getService(ServiceName.RENDERER).stop();
        document.exitPointerLock();
    }

    public resume(canvas: HTMLCanvasElement) {
        canvas.requestPointerLock();
        this.getService(ServiceName.RENDERER).start();
    }

    public async setup(setupData: SetupInterface): Promise<void> {
        // TODO: Preload assets for shaders!

        if (setupData.id) {
            await this.load(setupData.id);
        } else {
            await this.new(setupData.name ?? DEFAULT_NAME, setupData.seed ?? generateSeed());
        }

        const sceneService    = this.getService(ServiceName.SCENE),
              entityService   = this.getService(ServiceName.ENTITY);

        sceneService.setController(new PlayerController(
            sceneService.getCamera(),
            entityService.getPlayer()!,
        ));
    }

    public async teardown(): Promise<void> {
        await Promise.all([
            Object.values(this.services).map((service) => service.discard())
        ]);

        this.services = {};
        delete this.storageAdapter;
        delete this.context;

        Fullscreen.exit();
    }

    private async new(name: string, seed: string) {
        const id = generateUUID();
        await this.createServices(id, true);
        this.getService(ServiceName.GAME_CONFIG).create(id, name, seed),

        await Promise.all([
            this.getService(ServiceName.SCENE).create(),
            this.getService(ServiceName.ENTITY).create(),
            this.getService(ServiceName.RENDERER).create(),
            this.getService(ServiceName.WORLD).create(),
        ]);
    }

    private async load(id: string): Promise<void> {
        await this.createServices(id, false);
        await this.getService(ServiceName.GAME_CONFIG).load()!;

        await Promise.all([
            this.getService(ServiceName.SCENE).create(),
            this.getService(ServiceName.ENTITY).getAll(),
            this.getService(ServiceName.RENDERER).create(),
        ]);

        await this.getService(ServiceName.WORLD).load();
    }

    private async createServices(id: string, isNew: boolean) {
        this.storageAdapter = new StorageAdapter(id);

        if (isNew) {
            await this.storageAdapter.createDefaultStorage();
        }

        this.services.gameConfig = new GameConfigService(this.storageAdapter);
        this.services.scene = new SceneService();
        this.services.entity = new EntityService(this.storageAdapter);
        this.services.renderer = new RendererService();
        this.services.world = new WorldService(this.storageAdapter);
    }

    getService(name: ServiceName.ENTITY): EntityService
    getService(name: ServiceName.GAME_CONFIG): GameConfigService
    getService(name: ServiceName.SCENE): SceneService
    getService(name: ServiceName.RENDERER): RendererService
    getService(name: ServiceName.WORLD): WorldService
    getService(name: ServiceName) {
        switch (name) {
            case ServiceName.ENTITY:
                return this.services.entity;
            case ServiceName.GAME_CONFIG:
                return this.services.gameConfig;
            case ServiceName.RENDERER:
                return this.services.renderer;
            case ServiceName.SCENE:
                return this.services.scene;
            case ServiceName.WORLD:
                return this.services.world;
            default:
                throw new Error(`[Container] Service "${name}" does not exist!`);
        }
    }
}

export default new Container();