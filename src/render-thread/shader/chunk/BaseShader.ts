import AttributeInterface from '../../AttributeInterface';
import createShaderProgram from '../../utility/create-program';
import createTexture from '../../utility/create-texture';
import getShaderUniforms from '../../utility/get-uniforms';
import RenderObject from '../../RenderObject';

export default class BaseShader {
    static TEXTURE = 'textures.png';

    protected context: WebGL2RenderingContext;
    private uniforms: Record<string, AttributeInterface>;
    private readonly texture: WebGLTexture;
    private readonly program: WebGLProgram;

    constructor(context: WebGL2RenderingContext, vss: string, fss: string) {
        this.context = context;
        this.program = createShaderProgram(context, vss, fss);
        this.uniforms = getShaderUniforms(context, this.program);
        this.texture = createTexture(context, BaseShader.TEXTURE);

        this.context.useProgram(this.program);
        this.context.useProgram(null);
    }

    public run(ro: RenderObject, projection: Float32Array, view: Float32Array): void {
        this.context.useProgram(this.program);
        this.context.uniformMatrix4fv(this.uniforms.proj.loc, false, projection);
        this.context.uniformMatrix4fv(this.uniforms.camera.loc, false, view);
        this.context.activeTexture(this.context.TEXTURE0);
        this.context.bindTexture(this.context.TEXTURE_2D, this.texture);
        this.context.uniform1i(this.uniforms.tex0.loc, 0);

        this.preRender();
        this.render(ro);
    }

    private render(ro: RenderObject): void {
        const { context } = this;
        context.uniformMatrix4fv(this.uniforms.view.loc, false, ro.view);
        context.bindVertexArray(ro.vao);
        context.drawElements(context.TRIANGLES, ro.indexCount, context.UNSIGNED_SHORT, 0);
    }

    protected preRender() {
        throw new Error('Must be implemented!');
    }
}