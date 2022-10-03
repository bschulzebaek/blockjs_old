import MissingContainerPropertyError from '../shared/exceptions/MissingContainerPropertyError';

class RenderPipelineContainer {
    private renderPort?: MessagePort;
    private scenePort?: MessagePort;

    public setRenderPort(port: MessagePort) {
        this.renderPort = port;
    }

    public getRenderPort() {
        if (!this.renderPort) {
            throw new MissingContainerPropertyError('RenderPipelineContainer', 'renderPort');
        }

        return this.renderPort!;
    }

    public setScenePort(port: MessagePort) {
        this.scenePort = port;
    }

    public getScenePort() {
        if (!this.scenePort) {
            throw new MissingContainerPropertyError('RenderPipelineContainer', 'scenePort');
        }

        return this.scenePort!;
    }
}

export default new RenderPipelineContainer()