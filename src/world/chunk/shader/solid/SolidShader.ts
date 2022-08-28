import vss from './vss';
import fss from './fss';
import BaseShader from '../BaseShader';

export default class SolidShader extends BaseShader {

    constructor() {
        super(vss, fss);
    }

    protected preRender() {
        const { context } = this;

        context.enable(context.DEPTH_TEST);
        context.depthMask(true);
        context.enable(context.BLEND);
        context.enable(context.CULL_FACE);
    }
}