import fss from './fss.glsl?raw';
import vss from './vss.glsl?raw';
import RenderObject from '../../RenderObject';
import Shader from '../Shader';

export default class CursorShader extends Shader {

    static COLOR = [1.0, 1.0, 1.0, 0.3];

    constructor(context: WebGL2RenderingContext) {
        super(context, vss, fss);

        this.context.uniform4fv(this.uniforms.color.loc, CursorShader.COLOR);
    }

    protected setup(projection: Float32Array, view: Float32Array) {
        const { context, uniforms } = this;

        context.uniformMatrix4fv(uniforms.proj.loc, false, projection);
        context.uniformMatrix4fv(uniforms.camera.loc, false, view);
        context.enable(context.BLEND);
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
        this.context.disable(this.context.BLEND);
    }
}