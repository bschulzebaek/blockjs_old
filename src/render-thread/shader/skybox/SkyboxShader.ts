import createCubemap from '../utility/create-cubemap';
import fss from './fss.glsl?raw';
import vss from './vss.glsl?raw';
import type RenderObject from '../../RenderObject';
import Shader from '../Shader';

export default class SkyboxShader extends Shader {
    static TEXTURE = [
        'skybox/mc_rt.png',
        'skybox/mc_lf.png',
        'skybox/mc_up.png',
        'skybox/mc_dn.png',
        'skybox/mc_bk.png',
        'skybox/mc_ft.png'
    ];

    private readonly texture: WebGLTexture;

    constructor(context: WebGL2RenderingContext) {
        super(context, vss, fss);

        this.texture = createCubemap(context, SkyboxShader.TEXTURE);
    }

    protected setup(projection: Float32Array, view: Float32Array) {
        const { context, uniforms, texture } = this;

        context.uniformMatrix4fv(uniforms.camera.loc, false, view);
        context.uniformMatrix4fv(uniforms.proj.loc, false, projection);
        context.activeTexture(context.TEXTURE0);
        context.bindTexture(context.TEXTURE_CUBE_MAP, texture);
        context.uniform1i(uniforms.sky.loc, 0);
        context.disable(context.CULL_FACE);
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
        const { context } = this;

        context.enable(context.CULL_FACE);
    }
}