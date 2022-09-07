import RenderObject from '../RenderObject';
import RenderContainer from '../RenderContainer';
import UnsupportedShaderError from '../../shared/exceptions/UnsupportedShaderError';

addEventListener('render-object-ready', (event) => {
    // @ts-ignore
    const ro: RenderObject = event.detail;
    const renderer = RenderContainer.getRenderer();

    switch (ro.shader) {
        case 'cursor':
        case 'skybox':
        case 'item-drop':
            renderer.renderObjects.set(ro.id, ro);
            break;
        case 'chunk-solid':
            renderer.chunkSolidObjects.set(ro.id, ro);
            break;
        case 'chunk-glass':
            renderer.chunkGlassObjects.set(ro.id, ro);
            break;
        default:
            throw new UnsupportedShaderError(ro.shader);
    }
});