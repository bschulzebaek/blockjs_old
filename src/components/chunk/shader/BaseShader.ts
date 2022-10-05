import Shader from '../../../framework/shader/Shader';
import createTexture from '../../../framework/shader/utility/create-texture';
import RenderObject from '../../../framework/shader/RenderObject';

export default class BaseShader extends Shader {
    static TEXTURE = 'textures.png';

    private readonly texture: WebGLTexture;

    constructor(context: WebGL2RenderingContext, vss: string, fss: string) {
        super(context, vss, fss);

        this.texture = createTexture(context, BaseShader.TEXTURE);
    }

    protected setup(projection: Float32Array, view: Float32Array) {
        const { context, uniforms, texture } = this;

        context.uniformMatrix4fv(uniforms.proj.loc, false, projection);
        context.uniformMatrix4fv(uniforms.camera.loc, false, view);
        context.activeTexture(context.TEXTURE0);
        context.bindTexture(context.TEXTURE_2D, texture);
        context.uniform1i(uniforms.tex0.loc, 0);

        this.childSetup();
    }

    protected drawBatch(batch: RenderObject[]): void {
        const { context } = this;

        batch.forEach((ro) => {
            context.uniformMatrix4fv(this.uniforms.view.loc, false, ro.view);
            context.bindVertexArray(ro.vao);
            context.drawElements(context.TRIANGLES, ro.indexCount, context.UNSIGNED_SHORT, 0);
        });
    }

    protected cleanup() {
        this.childCleanup();
    }

    protected childSetup() {
        throw new Error('Must be implemented!');
    }

    protected childCleanup() {
        throw new Error('Must be implemented!');
    }
}