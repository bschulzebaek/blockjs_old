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
        gameConfigService?: GameConfigService,
        entityService?: EntityService,
        sceneService?: SceneService,
        rendererService?: RendererService,
        worldService?: WorldService,
    } = {
        gameConfigService: undefined,
        entityService: undefined,
        sceneService: undefined,
        rendererService: undefined,
        worldService: undefined,
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
        console.log(`[CONTAINER] Start`);

        const sceneService    = this.getService(ServiceName.SCENE),
              worldService    = this.getService(ServiceName.WORLD),
              entityService   = this.getService(ServiceName.ENTITY),
              rendererService = this.getService(ServiceName.RENDERER);

        this.context = canvas.getContext('webgl2') as WebGL2RenderingContext;

        prepareCanvas(canvas);

        // Should be moved to "setup", but requires context to be set. Make Setup.vue a child of Game/Index.vue
        // Or extract everything context related
        sceneService.createSceneEntities();
        worldService.beforePlay();

        rendererService.start();

        sceneService.setController(new PlayerController(
            sceneService.getCamera(),
            entityService.getPlayer()!,
        ));
    }

    public pause() {
        console.log(`[CONTAINER] Pause`);

        this.getService(ServiceName.RENDERER).stop();
        document.exitPointerLock();
    }

    public resume(canvas: HTMLCanvasElement) {
        console.log(`[CONTAINER] Resume`);

        canvas.requestPointerLock();
        this.getService(ServiceName.RENDERER).start();
    }

    public async setup(setupData: SetupInterface): Promise<void> {
        console.log(`[CONTAINER] Setup`);

        // TODO: Preload assets for shaders!

        if (setupData.id) {
            await this.load(setupData.id);
        } else {
            await this.new(setupData.name ?? DEFAULT_NAME, setupData.seed ?? generateSeed());
        }
    }

    public async teardown(): Promise<void> {
        console.log(`[CONTAINER] Teardown`);

        await Promise.all([
            this.services.gameConfigService?.discard(),
            this.services.rendererService?.discard(),
            this.services.sceneService?.discard(),
            this.services.entityService?.discard(),
            this.services.worldService?.discard(),
        ]);

        this.services = {};
        delete this.storageAdapter;
        delete this.context;

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
            this.services.worldService?.create(seed),
        ]);
    }

    private async load(id: string): Promise<void> {
        await this.createServices(id, false);
        const config = await this.services.gameConfigService?.load()!;

        await Promise.all([
            this.services.sceneService?.create(),
            this.services.entityService?.getAll(),
            this.services.rendererService?.create(),
            this.services.worldService?.load(config.getSeed()),

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
        this.services.worldService = new WorldService(this.storageAdapter);
    }

    getService(name: ServiceName.ENTITY): EntityService
    getService(name: ServiceName.GAME_CONFIG): GameConfigService
    getService(name: ServiceName.SCENE): SceneService
    getService(name: ServiceName.RENDERER): RendererService
    getService(name: ServiceName.WORLD): WorldService
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
            case ServiceName.WORLD:
                return this.services.worldService;
            default:
                throw new Error(`[Container] Service "${name}" does not exist!`);
        }
    }
}

export default new Container();