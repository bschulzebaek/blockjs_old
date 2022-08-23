import ShaderInterface from '../ShaderInterface';
import AttributeInterface from '../AttributeInterface';
import vss from './vss';
import fss from './fss';
import createShaderProgram from '../utility/create-program';
import getShaderUniforms from '../utility/get-uniforms';
import createCubemap from '../utility/create-cubemap';
import Container, { ServiceName } from '../../../Container';
import CameraInterface from '../../../../content/camera/CameraInterface';
import ModelInterface from '../../../scene/model/ModelInterface';
import { Matrix4 } from '../../../../common/math';

export default class SkyboxShader implements ShaderInterface {
    static TEXTURE = [ 'skybox/mc_rt.png', 'skybox/mc_lf.png', 'skybox/mc_up.png', 'skybox/mc_dn.png', 'skybox/mc_bk.png', 'skybox/mc_ft.png' ];

    private context: WebGL2RenderingContext;
    private camera: CameraInterface;
    private program: WebGLProgram;
    private uniforms: Record<string, AttributeInterface>;
    private texture: WebGLTexture;

    constructor() {
        this.context = Container.getContext();
        this.camera = Container.getService(ServiceName.SCENE).getCamera();
        this.program = createShaderProgram(vss, fss);
        this.uniforms = getShaderUniforms(this.program);
        this.texture = createCubemap(SkyboxShader.TEXTURE);

        this.context.useProgram(this.program);
        this.context.uniformMatrix4fv(this.uniforms['proj'].loc, false, this.camera.projectionMatrix);
    }

    public run(model: ModelInterface): void {
        this.context.useProgram(this.program);

        this.preRender(model)
        this.render(model);
    }

    private preRender(model: ModelInterface) {
        const { context, texture, uniforms, camera } = this;

        context.uniformMatrix4fv(uniforms.camera.loc, false, camera.view);
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