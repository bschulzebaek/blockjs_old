import MissingContainerPropertyError from '../../shared/exceptions/MissingContainerPropertyError';
import WorldConfig from '../../components/world-config/WorldConfig';
import WorldService from './WorldService';

class WorldContainer {
    private config?: WorldConfig;
    private scenePort?: MessagePort;
    private renderPort?: MessagePort;

    private worldService?: WorldService;
    private subWorker: Map<string, { worker: Worker, chunks: string[] }> = new Map();

    public addWorker(id: string, worker: Worker, chunks: string[]) {
        this.subWorker.set(id, { worker, chunks });
    }

    public getWorker() {
        return this.subWorker;
    }

    public getWorldService() {
        if (!this.worldService) {
            throw new MissingContainerPropertyError('WorldContainer', 'worldService');
        }

        return this.worldService;
    }

    public setConfig(config: any) {
        this.config = new WorldConfig(config.id, config.name, config.seed, config.isNew);

        this.worldService = new WorldService();
    }

    public getConfig() {
        if (!this.config) {
            throw new MissingContainerPropertyError('WorldContainer', 'config');
        }

        return this.config;
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

    public setRenderPort(port: MessagePort) {
        this.renderPort = port;
    }

    public getRenderPort() {
        if (!this.renderPort) {
            throw new MissingContainerPropertyError('WorldContainer', 'renderPort');
        }

        return this.renderPort;
    }
}

export default new WorldContainer()