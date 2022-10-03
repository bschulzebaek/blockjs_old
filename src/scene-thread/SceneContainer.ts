import MissingContainerPropertyError from '../shared/exceptions/MissingContainerPropertyError';
import WorldService from './world/WorldService';
import InventoryService from '../main-thread/inventory/InventoryService';
import EntityService from './entity/EntityService';
import StorageAdapter from '../shared/storage/StorageAdapter';
import GameConfig from '../main-thread/game-config/GameConfig';
import World from './world/World';
import Scene from './scene/Scene';
import SceneService from './scene/SceneService';

class SceneContainer {
    private config?: GameConfig;
    private renderPipelinePort?: MessagePort;
    private entityService?: EntityService;
    private inventoryService?: InventoryService;
    private worldService?: WorldService;
    private sceneService?: SceneService;
    private world = new World();
    private scene = new Scene();

    public setConfig(config: any) {
        this.config = new GameConfig(config.id, config.name, config.seed, config.isNew);

        const storageAdapter = new StorageAdapter(this.config.getId());

        this.entityService = new EntityService(storageAdapter);
        this.inventoryService = new InventoryService(storageAdapter);
        this.worldService = new WorldService(storageAdapter);
        this.sceneService = new SceneService();
    }

    public getConfig() {
        if (!this.config) {
            throw new MissingContainerPropertyError('SceneContainer', 'config');
        }

        return this.config;
    }

    public setRenderPipelinePort(port: MessagePort) {
        this.renderPipelinePort = port;
    }

    public getRenderPipelinePort() {
        if (!this.renderPipelinePort) {
            throw new MissingContainerPropertyError('SceneContainer', 'renderPipelinePort');
        }

        return this.renderPipelinePort;
    }

    public getEntityService() {
        if (!this.entityService) {
            throw new MissingContainerPropertyError('SceneContainer', 'entityService');
        }

        return this.entityService;
    }

    public getInventoryService() {
        if (!this.inventoryService) {
            throw new MissingContainerPropertyError('SceneContainer', 'inventoryService');
        }

        return this.inventoryService;
    }

    public getWorldService() {
        if (!this.worldService) {
            throw new MissingContainerPropertyError('SceneContainer', 'worldService');
        }

        return this.worldService;
    }

    public getSceneService() {
        if (!this.sceneService) {
            throw new MissingContainerPropertyError('SceneContainer', 'sceneService');
        }

        return this.sceneService;
    }

    public getWorld() {
        if (!this.world) {
            throw new MissingContainerPropertyError('SceneContainer', 'world');
        }

        return this.world;
    }

    public getScene() {
        if (!this.scene) {
            throw new MissingContainerPropertyError('SceneContainer', 'scene');
        }

        return this.scene;
    }

    public getCamera() {
        return this.getScene().getCamera();
    }
}

export default new SceneContainer()