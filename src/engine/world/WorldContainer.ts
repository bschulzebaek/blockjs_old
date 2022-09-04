import Repository from '../storage/Repository';
import ChunkRepository from './chunk/ChunkRepository';
import StorageAdapter from '../storage/StorageAdapter';
import World from './World';

class WorldContainer {

    private renderPort?: MessagePort;
    private scenePort?: MessagePort;
    private chunkRepository?: Repository;
    private world = new World();
    private seed = '';

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

    public createChunkRepository(id: string) {
        this.chunkRepository = new ChunkRepository(new StorageAdapter(id));
    }

    public getChunkRepository() {
        if (!this.chunkRepository) {
            throw new Error('[WorldContainer] chunkRepository undefined!');
        }

        return this.chunkRepository;
    }

    public getWorld() {
        return this.world;
    }

    public setWorld(world: World) {
        this.world = world;
    }

    public setSeed(seed: string) {
        this.seed = seed;
    }

    public getSeed() {
        return this.seed;
    }
}

export default new WorldContainer()