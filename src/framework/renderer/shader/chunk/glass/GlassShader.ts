import vss from './vss';
import fss from './fss';
import BaseShader from '../BaseShader';

export default class GlassShader extends BaseShader {

    constructor() {
        super(vss, fss);
    }

    protected preRender() {
        const { context } = this;

        context.enable(context.DEPTH_TEST);
        context.enable(context.BLEND);
        context.disable(context.CULL_FACE);
        context.blendFunc(context.ONE, context.ONE_MINUS_SRC_ALPHA);
    }
}