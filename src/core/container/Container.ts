import StorageAdapter from '../storage/StorageAdapter';
import EntityService from '../../content/entity/EntityService';
import Fullscreen from '../../common/utility/Fullscreen';
import generateUUID from '../../common/utility/generate-uuid';
import InventoryService from '../../items/inventory/InventoryService';
import GameConfigService from '../../content/game-config/GameConfigService';
import WorldService from '../world/WorldService';
import Renderer from '../renderer/Renderer';
import GameInstance, { SetupDataInterface } from '../game-instance/GameInstance';

export enum ServiceName {
    GAME_CONFIG = 'gameConfig',
    ENTITY = 'entity',
    WORLD = 'world',
    INVENTORY = 'inventory',
}

class Container {
    private renderer = new Renderer();
    private storageAdapter?: StorageAdapter;
    private context?: WebGL2RenderingContext;
    private gameInstance?: GameInstance;

    private services: {
        gameConfig?: GameConfigService,
        entity?: EntityService,
        world?: WorldService,
        inventory?: InventoryService,
    } = {
        gameConfig: undefined,
        entity: undefined,
        world: undefined,
        inventory: undefined,
    };

    public getStorageAdapter() {
        if (!this.storageAdapter) {
            throw new Error('[Container:getScene] StorageAdapter not found!');
        }

        return this.storageAdapter;
    }

    public getScene() {
        if (!this.gameInstance) {
            throw new Error('[Container:getScene] GameInstance not found!');
        }

        return this.gameInstance?.getScene();
    }

    public getGameInstance() {
        return this.gameInstance;
    }

    public getRenderer() {
        return this.renderer;
    }

    public setContext(context: WebGL2RenderingContext) {
        this.context = context;
    }

    public getContext(): WebGL2RenderingContext {
        return this.context as WebGL2RenderingContext;
    }

    public isRunning(): boolean {
        if (!Object.keys(this.services).length) {
            return false;
        }

        return this.renderer.isRunning();
    }

    public async setup(setupData: SetupDataInterface): Promise<void> {
        setupData.isNew = !setupData.id;

        if (setupData.isNew) {
            setupData.id = generateUUID();
        }

        await this.createServices(setupData.id!, setupData.isNew);
        this.gameInstance = new GameInstance(setupData);
    }

    public async teardown() {
        await this.gameInstance?.teardown();

        await Promise.all([
            Object.values(this.services).map((service) => service.discard())
        ]);

        this.services = {};
        delete this.storageAdapter;
        delete this.context;

        Fullscreen.exit();
    }

    private async createServices(id: string, isNew: boolean) {
        this.storageAdapter = new StorageAdapter(id);

        if (isNew) {
            await this.storageAdapter.createDefaultStorage();
        }

        this.services[ServiceName.GAME_CONFIG] = new GameConfigService(this.storageAdapter);
        this.services[ServiceName.ENTITY]      = new EntityService(this.storageAdapter);
        this.services[ServiceName.WORLD]       = new WorldService(this.storageAdapter);
        this.services[ServiceName.INVENTORY]   = new InventoryService(this.storageAdapter);
    }

    getService(name: ServiceName.ENTITY): EntityService
    getService(name: ServiceName.GAME_CONFIG): GameConfigService
    getService(name: ServiceName.WORLD): WorldService
    getService(name: ServiceName.INVENTORY): InventoryService
    getService(name: ServiceName) {
        switch (name) {
            case ServiceName.ENTITY:
                return this.services.entity;
            case ServiceName.GAME_CONFIG:
                return this.services.gameConfig;
            case ServiceName.WORLD:
                return this.services.world;
            case ServiceName.INVENTORY:
                return this.services.inventory;
            default:
                throw new Error(`[Container] Service "${name}" does not exist!`);
        }
    }
}

export default new Container();