import fss from './fss.glsl?raw';
import vss from './vss.glsl?raw';
import RenderObject from '../../RenderObject';
import Shader from '../Shader';

export default class ItemDropShader extends Shader {
    static COLOR = [0.0, 0.0, 1.0, 0.7];

    static TEXTURE = 'textures.png';

    constructor(context: WebGL2RenderingContext) {
        super(context, vss, fss);

        this.context.uniform4fv(this.uniforms.color.loc, ItemDropShader.COLOR);
    }

    protected setup(projection: Float32Array, view: Float32Array) {
        const { context, program, uniforms } = this;
        context.useProgram(program);
        context.uniformMatrix4fv(uniforms.proj.loc, false, projection);
        context.uniformMatrix4fv(uniforms.camera.loc, false, view);
    }

    protected drawBatch(batch: RenderObject[]) {
        const { context } = this;

        batch.forEach((ro) => {
            context.uniformMatrix4fv(this.uniforms.view.loc, false, ro.view);
            context.bindVertexArray(ro.vao);
            context.drawElements(context.TRIANGLES, ro.indexCount, context.UNSIGNED_SHORT, 0);
        });
    }

    protected cleanup() {

    }
}