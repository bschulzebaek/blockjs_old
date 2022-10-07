import MissingContainerPropertyError from '../../shared/exceptions/MissingContainerPropertyError';
import StorageAdapter from '../../shared/storage/StorageAdapter';
import WorldConfig from '../../components/world-config/WorldConfig';
import Scene from './scene/Scene';
import World from '../../components/world/World';
import type Camera from '../../components/camera/Camera';

import EntityService from '../../components/entity/EntityService';
import InventoryService from '../../components/inventory/InventoryService';
import ChunkRepository from '../../components/chunk/ChunkRepository';
import { CAMERA_ID } from '../../data/scene-data';
import PlayerController from '../../components/player/PlayerController';

class SceneContainer {
    private config?: WorldConfig;
    private renderPipelinePort?: MessagePort;
    private worldPort?: MessagePort;
    private entityService?: EntityService;
    private inventoryService?: InventoryService;
    private world = new World();
    private scene = new Scene();

    private chunkRepository?: ChunkRepository;

    public setConfig(config: any) {
        this.config = new WorldConfig(config.id, config.name, config.seed, config.isNew);

        const storageAdapter = new StorageAdapter(this.config.getId());

        this.entityService = new EntityService(storageAdapter);
        this.inventoryService = new InventoryService(storageAdapter);
        this.chunkRepository = new ChunkRepository(storageAdapter);
    }

    public getChunkRepository() {
        if (!this.chunkRepository) {
            throw new MissingContainerPropertyError('SceneContainer', 'chunkRepository');
        }

        return this.chunkRepository;
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

    public setWorldPort(port: MessagePort) {
        this.worldPort = port;
    }

    public getWorldPort() {
        if (!this.worldPort) {
            throw new MissingContainerPropertyError('SceneContainer', 'worldPort');
        }

        return this.worldPort;
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
        return this.getScene().getSceneObject(CAMERA_ID) as Camera;
    }

    public getPlayerEntity() {
        const controller = this.getScene().getSceneObject(PlayerController.SCENE_ID);

        if (!controller) {
            throw new MissingContainerPropertyError('SceneContainer', `scene.sceneObjects['${PlayerController.SCENE_ID}']`);
        }

        return (controller as PlayerController).getEntity();
    }
}

export default new SceneContainer()