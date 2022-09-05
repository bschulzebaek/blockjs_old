import AttributeInterface from '../../AttributeInterface';
import createShaderProgram from '../../utility/create-program';
import getShaderUniforms from '../../utility/get-uniforms';
import fss from './fss';
import vss from './vss';
import RenderObject from '../../RenderObject';

export default class ItemDropShader {
    static COLOR = [0.0, 0.0, 1.0, 0.7];

    static TEXTURE = 'textures.png';

    private context: WebGL2RenderingContext;
    private program: WebGLProgram;
    private uniforms: Record<string, AttributeInterface>;

    constructor(context: WebGL2RenderingContext) {
        this.context = context;
        this.program = createShaderProgram(context, vss, fss);
        this.uniforms = getShaderUniforms(context, this.program);
        this.context.useProgram(this.program);

        this.context.uniform4fv(this.uniforms['color'].loc, ItemDropShader.COLOR);
    }

    public run(ro: RenderObject, projection: Float32Array, view: Float32Array): void {
        this.context.useProgram(this.program);
        this.context.uniformMatrix4fv(this.uniforms['proj'].loc, false, projection);
        this.context.uniformMatrix4fv(this.uniforms['camera'].loc, false, view);
        this.context.uniformMatrix4fv(this.uniforms['view'].loc, false, ro.view);

        this.render(ro);
    }

    public render(ro: RenderObject): void {
        const { context } = this;

        context.blendFunc(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA);

        context.bindVertexArray(ro.vao);
        context.enable(context.BLEND);
        context.enable(context.CULL_FACE);

        context.drawElements(context.TRIANGLES, ro.indexCount, context.UNSIGNED_SHORT, 0);
    }
}