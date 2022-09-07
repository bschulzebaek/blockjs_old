import Scene from './Scene';
import GameConfig from '../main-thread/game-config/GameConfig';
import SceneWorld from './world-helper/SceneWorld';
import PlayerController from './scene-content/player/PlayerController';
import EntityService from './entity/EntityService';
import StorageAdapter from '../shared/storage/StorageAdapter';
import InventoryService from '../main-thread/inventory/InventoryService';

Object.defineProperty(globalThis, 'innerWidth', { value: 1920 });
Object.defineProperty(globalThis, 'innerHeight', { value: 1080 });

class SceneContainer {
    private config?: GameConfig;
    private renderPort?: MessagePort;
    private worldPort?: MessagePort;
    private entityService?: EntityService;
    private inventoryService?: InventoryService;
    private scene = new Scene()
    private world = new SceneWorld();

    public async setConfig(config: any) {
        this.config = new GameConfig(config.id, config.name, config.seed, config.isNew);
        this.entityService = new EntityService(new StorageAdapter(this.config.getId()));
        this.inventoryService = new InventoryService(this.config.getId());
    }

    public async createScene() {
        const service = this.getEntityService();
        await service.load();

        const player = new PlayerController(
            this.scene.getCamera(),
            service.getPlayer(),
            this.world,
        );

        // @ts-ignore
        this.scene.addSceneObject(player);
    }

    public setRenderPort(port: MessagePort) {
        this.renderPort = port;
    }

    public getRenderPort() {
        if (!this.renderPort) {
            throw new Error('[SceneContainer] renderPort undefined!');
        }

        return this.renderPort;
    }

    public setWorldPort(port: MessagePort) {
        this.worldPort = port;
    }

    public getWorldPort() {
        if (!this.renderPort) {
            throw new Error('[SceneContainer] worldPort undefined!');
        }

        return this.worldPort!;
    }

    public getEntityService() {
        if (!this.entityService) {
            throw new Error('[SceneContainer] entityService undefined!');
        }

        return this.entityService;
    }
    public getInventoryService() {
        if (!this.inventoryService) {
            throw new Error('[SceneContainer] inventoryService undefined!');
        }

        return this.inventoryService;
    }

    public getConfig() {
        if (!this.config) {
            throw new Error('[SceneContainer] config undefined!');
        }

        return this.config;
    }

    public getCamera() {
        return this.scene.getCamera();
    }

    public getWorld() {
        return this.world;
    }

    public getScene() {
        if (!this.scene) {
            throw new Error('[SceneContainer] scene undefined!');
        }

        return this.scene;
    }
}

export default new SceneContainer()