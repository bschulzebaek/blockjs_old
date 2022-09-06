import ShaderAttributeInterface from '../ShaderAttributeInterface';
import createCubemap from '../utility/create-cubemap';
import createShaderProgram from '../utility/create-program';
import getShaderUniforms from '../utility/get-uniforms';
import fss from './fss';
import vss from './vss';
import type RenderObject from '../../RenderObject';

export default class SkyboxShader {
    static TEXTURE = [ 'skybox/mc_rt.png', 'skybox/mc_lf.png', 'skybox/mc_up.png', 'skybox/mc_dn.png', 'skybox/mc_bk.png', 'skybox/mc_ft.png' ];

    private readonly context: WebGL2RenderingContext;
    private readonly program: WebGLProgram;
    private readonly uniforms: Record<string, ShaderAttributeInterface>;
    private readonly texture: WebGLTexture;

    constructor(context: WebGL2RenderingContext) {
        this.context = context;
        this.program = createShaderProgram(context, vss, fss);
        this.uniforms = getShaderUniforms(context, this.program);
        this.texture = createCubemap(context, SkyboxShader.TEXTURE);
        this.context.useProgram(this.program);
    }

    public run(ro: RenderObject, projection: Float32Array, view: Float32Array): void {
        this.context.useProgram(this.program);
        this.context.uniformMatrix4fv(this.uniforms.camera.loc, false, view);
        this.context.uniformMatrix4fv(this.uniforms['proj'].loc, false, projection);

        this.render(ro);
    }

    private render(ro: RenderObject) {
        const { context, texture, uniforms } = this;

        context.uniformMatrix4fv(uniforms.view.loc, false, ro.view);
        context.activeTexture(context.TEXTURE0);
        context.bindTexture(context.TEXTURE_CUBE_MAP, texture);
        context.uniform1i(uniforms.sky.loc, 0);

        context.bindVertexArray(ro.vao);
        context.disable(context.CULL_FACE);
        context.drawElements(context.TRIANGLES, ro.indexCount, context.UNSIGNED_SHORT, 0);
        context.enable(context.CULL_FACE);
    }
}