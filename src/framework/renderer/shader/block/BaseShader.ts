import AttributeInterface from '../AttributeInterface';
import createShaderProgram from '../utility/create-program';
import getShaderUniforms from '../utility/get-uniforms';
import createTexture from '../utility/create-texture';
import CameraInterface from '../../../scene/camera/CameraInterface';
import Container, { ServiceName } from '../../../Container';
import { Matrix4 } from '../../../../math';
import ModelInterface from '../../../scene/model/ModelInterface';

export default class BaseShader {
    static TEXTURE = 'textures.png';

    protected context: WebGL2RenderingContext;
    private camera: CameraInterface;
    private uniforms: Record<string, AttributeInterface>;
    private texture: WebGLTexture;
    private program: WebGLProgram;

    constructor(vss: string, fss: string) {
        this.context = Container.getContext();
        this.program = createShaderProgram(vss, fss);
        this.uniforms = getShaderUniforms(this.program);

        this.context.useProgram(this.program);
        this.camera = Container.getService(ServiceName.SCENE).getCamera();

        this.texture = createTexture(BaseShader.TEXTURE);
        this.context.uniformMatrix4fv(this.uniforms['proj'].loc, false, this.camera.projectionMatrix);
    }

    public run(model: ModelInterface): void {
        this.context.useProgram(this.program);
        this.context.uniformMatrix4fv(this.uniforms['camera'].loc, false, this.camera.view);
        this.context.activeTexture(this.context['TEXTURE0']);
        this.context.bindTexture(this.context.TEXTURE_2D, this.texture);
        this.context.uniform1i(this.uniforms['tex0'].loc, 0);

        this.preRender();
        this.render(model);
    }

    private render(model: ModelInterface): void {
        const { context } = this;
        const { mesh, view } = model;

        context.uniformMatrix4fv(this.uniforms['view'].loc, false, view as Matrix4);
        context.bindVertexArray(mesh.vao);
        context.drawElements(mesh.drawMode, mesh.indexCount, context.UNSIGNED_SHORT, 0);
    }

    protected preRender() {
        throw new Error('Must be implemented!');
    }
}