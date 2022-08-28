import { Matrix4 } from '../../../common/math';
import Container from '../../../core/container/Container';
import AttributeInterface from '../../../core/renderer/AttributeInterface';
import ShaderInterface from '../../../core/renderer/ShaderInterface';
import createCubemap from '../../../core/renderer/utility/create-cubemap';
import createShaderProgram from '../../../core/renderer/utility/create-program';
import getShaderUniforms from '../../../core/renderer/utility/get-uniforms';
import ModelInterface from '../../../core/scene/model/ModelInterface';
import fss from './fss';
import vss from './vss';
import type Camera from '../../../content/camera/Camera';


export default class SkyboxShader implements ShaderInterface{
    static TEXTURE = [ 'skybox/mc_rt.png', 'skybox/mc_lf.png', 'skybox/mc_up.png', 'skybox/mc_dn.png', 'skybox/mc_bk.png', 'skybox/mc_ft.png' ];

    private context: WebGL2RenderingContext;
    private camera: Camera;
    private program: WebGLProgram;
    private uniforms: Record<string, AttributeInterface>;
    private texture: WebGLTexture;

    constructor() {
        this.context = Container.getContext();
        this.program = createShaderProgram(vss, fss);
        this.uniforms = getShaderUniforms(this.program);
        this.texture = createCubemap(SkyboxShader.TEXTURE);

        this.camera = Container.getScene().getSceneObject('camera') as Camera;

        this.context.useProgram(this.program);
        this.context.uniformMatrix4fv(this.uniforms['proj'].loc, false, this.camera.getProjectionMatrix());
    }

    public run(model: ModelInterface): void {
        this.context.useProgram(this.program);

        this.preRender(model)
        this.render(model);
    }

    private preRender(model: ModelInterface) {
        const { context, texture, uniforms } = this;

        context.uniformMatrix4fv(uniforms.camera.loc, false, this.camera.getView());
        context.uniformMatrix4fv(uniforms.view.loc, false, model.view as Matrix4);
        context.activeTexture(context.TEXTURE0);
        context.bindTexture(context.TEXTURE_CUBE_MAP, texture);
        context.uniform1i(uniforms.sky.loc, 0);
    }

    private render(model: ModelInterface) {
        const { context } = this;
        const { mesh } = model;

        context.bindVertexArray(mesh.vao);
        context.disable(context.CULL_FACE);
        context.drawElements(mesh.drawMode, mesh.indexCount, context.UNSIGNED_SHORT, 0);
        context.enable(context.CULL_FACE);
    }
}