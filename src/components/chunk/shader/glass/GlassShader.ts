import vss from './vss.glsl?raw';
import fss from './fss.glsl?raw';
import BaseShader from '../BaseShader';

export default class GlassShader extends BaseShader {

    constructor(context: WebGL2RenderingContext) {
        super(context, vss, fss);
    }

    protected childSetup() {
        const { context } = this;

        context.disable(context.CULL_FACE);
    }

    protected childCleanup() {
        const { context } = this;

        context.enable(context.CULL_FACE);
    }
}