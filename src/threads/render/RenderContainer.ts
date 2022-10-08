import type Renderer from './Renderer';
import MissingContainerPropertyError from '../../shared/exceptions/MissingContainerPropertyError';
import RenderService from './RenderService';

enum DrawMode {
    LINE = 1,
    TRIANGLE = 4,
}

class RenderContainer {
    private renderer?: Renderer;
    private renderService: RenderService
    private drawMode: number = DrawMode.TRIANGLE;

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

    public toggleWireframe() {
        this.drawMode = this.drawMode === DrawMode.TRIANGLE ? DrawMode.LINE : DrawMode.TRIANGLE;
    }

    public getDrawMode() {
        return this.drawMode;
    }
}

export default new RenderContainer()