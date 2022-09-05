import ChunkRepository from './chunk/ChunkRepository';
import StorageAdapter from '../shared/storage/StorageAdapter';
import World from './World';
import GameConfig from '../main-thread/game-config/GameConfig';

class WorldContainer {
    private config?: GameConfig;
    private renderPort?: MessagePort;
    private scenePort?: MessagePort;
    private chunkRepository?: ChunkRepository;
    private world = new World();

    public setConfig(config: any) {
        this.config = new GameConfig(config.id, config.name, config.seed, config.isNew);
        this.chunkRepository = new ChunkRepository(new StorageAdapter(this.config.getId()));
    }

    public setRenderPort(port: MessagePort) {
        this.renderPort = port;
    }

    public getRenderPort() {
        if (!this.renderPort) {
            throw new Error('[WorldContainer] renderPort undefined!');
        }

        return this.renderPort!;
    }

    public setScenePort(port: MessagePort) {
        this.scenePort = port;
    }

    public getScenePort() {
        if (!this.renderPort) {
            throw new Error('[WorldContainer] scenePort undefined!');
        }

        return this.scenePort!;
    }

    public getChunkRepository() {
        if (!this.chunkRepository) {
            throw new Error('[WorldContainer] chunkRepository undefined!');
        }

        return this.chunkRepository;
    }

    public getConfig() {
        if (!this.config) {
            throw new Error('[WorldContainer] config undefined!');
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