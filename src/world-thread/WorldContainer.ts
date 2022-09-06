import ChunkRepository from './chunk/ChunkRepository';
import StorageAdapter from '../shared/storage/StorageAdapter';
import World from './World';
import GameConfig from '../main-thread/game-config/GameConfig';
import MissingContainerPropertyError from '../shared/exceptions/MissingContainerPropertyError';
import WorldService from './WorldService';

class WorldContainer {
    private readonly worldService: WorldService;
    private config?: GameConfig;
    private renderPort?: MessagePort;
    private scenePort?: MessagePort;
    private chunkRepository?: ChunkRepository;
    private world = new World();

    constructor() {
        this.worldService = new WorldService();
    }

    public getWorldService() {
        return this.worldService;
    }

    public setConfig(config: any) {
        this.config = new GameConfig(config.id, config.name, config.seed, config.isNew);
        this.chunkRepository = new ChunkRepository(new StorageAdapter(this.config.getId()));
    }

    public setRenderPort(port: MessagePort) {
        this.renderPort = port;
    }

    public getRenderPort() {
        if (!this.renderPort) {
            throw new MissingContainerPropertyError('WorldContainer', 'renderPort');
        }

        return this.renderPort!;
    }

    public setScenePort(port: MessagePort) {
        this.scenePort = port;
    }

    public getScenePort() {
        if (!this.scenePort) {
            throw new MissingContainerPropertyError('WorldContainer', 'scenePort');
        }

        return this.scenePort!;
    }

    public getChunkRepository() {
        if (!this.chunkRepository) {
            throw new MissingContainerPropertyError('WorldContainer', 'chunkRepository');
        }

        return this.chunkRepository;
    }

    public getConfig() {
        if (!this.config) {
            throw new MissingContainerPropertyError('WorldContainer', 'config');
        }

        return this.config;
    }

    public getWorld() {
        return this.world;
    }

    public setWorld(world: World) {
        this.world = world;
    }
}

export default new WorldContainer()