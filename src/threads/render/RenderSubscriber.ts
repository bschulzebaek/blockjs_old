import RenderObjectReadyEvent from './events/RenderObjectReadyEvent';
import RenderContainer from './RenderContainer';
import UnsupportedShaderError from '../../framework/shader/UnsupportedShaderError';

class RenderSubscriber {
    constructor() {
        addEventListener(RenderObjectReadyEvent.NAME, this.onRenderObjectReady as unknown as EventListener);
    }

    private onRenderObjectReady = (event: RenderObjectReadyEvent) => {
        const ro = event.getRenderObject();
        const renderer = RenderContainer.getRenderer();

        switch (ro.shader) {
            case 'cursor':
            case 'skybox':
            case 'item-drop':
            case 'chunk-solid':
            case 'chunk-glass':
                renderer.renderObjects.set(ro.id, ro);
                break;
            default:
                throw new UnsupportedShaderError(ro.shader);
        }
    }
}

export default new RenderSubscriber()