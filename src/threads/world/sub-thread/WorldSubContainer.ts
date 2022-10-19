import WorldConfig from '../../../components/world-config/WorldConfig';
import MissingContainerPropertyError from '../../../shared/exceptions/MissingContainerPropertyError';
import StorageAdapter from '../../../shared/storage/StorageAdapter';
import ChunkRepository from '../../../components/chunk/ChunkRepository';
import WorldSubService from './WorldSubService';

class WorldSubContainer {
    private config?: WorldConfig;
    private renderPort?: MessagePort;
    private scenePort?: MessagePort;

    private worldSubService?: WorldSubService;

    public getWorldSubService() {
        if (!this.worldSubService) {
            throw new MissingContainerPropertyError('WorldSubContainer', 'worldSubService');
        }

        return this.worldSubService;
    }

    public setConfig(config: any) {
        this.config = new WorldConfig(config.id, config.name, config.seed, config.isNew);

        const storageAdapter = new StorageAdapter(this.config.getId());

        this.worldSubService = new WorldSubService(new ChunkRepository(storageAdapter), this.config);
    }

    public setScenePort(port: MessagePort) {
        this.scenePort = port;
    }

    public getScenePort() {
        if (!this.scenePort) {
            throw new MissingContainerPropertyError('WorldSubContainer', 'scenePort');
        }

        return this.scenePort!;
    }

    public setRenderPort(port: MessagePort) {
        this.renderPort = port;
    }

    public getRenderPort() {
        if (!this.renderPort) {
            throw new MissingContainerPropertyError('WorldSubContainer', 'renderPort');
        }

        return this.renderPort;
    }
}

export default new WorldSubContainer()