import type Renderer from './Renderer';
import MissingContainerPropertyError from '../shared/exceptions/MissingContainerPropertyError';

class RenderContainer {
    private renderer?: Renderer;

    public setRenderer(renderer: Renderer) {
        this.renderer = renderer;
    }

    public getRenderer() {
        if (!this.renderer) {
            throw new MissingContainerPropertyError('RenderContainer', 'renderer');
        }

        return this.renderer;
    }
}

export default new RenderContainer()