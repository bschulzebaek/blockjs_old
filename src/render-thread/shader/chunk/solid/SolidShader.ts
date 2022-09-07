import vss from './vss.glsl?raw';
import fss from './fss.glsl?raw';
import BaseShader from '../BaseShader';

export default class SolidShader extends BaseShader {

    constructor(context: WebGL2RenderingContext) {
        super(context, vss, fss);
    }

    protected childSetup() {

    }

    protected childCleanup() {

    }
}