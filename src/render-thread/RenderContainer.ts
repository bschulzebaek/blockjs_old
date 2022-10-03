import type Renderer from './Renderer';
import MissingContainerPropertyError from '../shared/exceptions/MissingContainerPropertyError';
import RenderService from './RenderService';

class RenderContainer {
    private renderer?: Renderer;
    private renderService: RenderService

    constructor() {
        this.renderService = new RenderService();
    }

    public setRenderer(renderer: Renderer) {
        this.renderer = renderer;
    }

    public getRenderer() {
        if (!this.renderer) {
            throw new MissingContainerPropertyError('RenderContainer', 'renderer');
        }

        return this.renderer;
    }

    public getRenderService() {
        if (!this.renderService) {
            throw new MissingContainerPropertyError('RenderContainer', 'renderService');
        }

        return this.renderService;
    }
}

export default new RenderContainer()