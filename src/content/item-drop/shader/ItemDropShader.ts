import { Matrix4 } from '../../../common/math';
import Container from '../../../core/container/Container';
import AttributeInterface from '../../../core/renderer/AttributeInterface';
import createShaderProgram from '../../../core/renderer/utility/create-program';
import getShaderUniforms from '../../../core/renderer/utility/get-uniforms';
import ModelInterface from '../../../core/scene/model/ModelInterface';
import CameraInterface from '../../camera/CameraInterface';
import fss from './fss';
import vss from './vss';

export default class ItemDropShader {
    static COLOR = [0.0, 0.0, 1.0, 0.7];

    static TEXTURE = 'textures.png';

    private camera: CameraInterface;

    private context: WebGL2RenderingContext;
    private program: WebGLProgram;
    private uniforms: Record<string, AttributeInterface>;

    constructor(camera: CameraInterface) {
        this.context = Container.getContext();
        this.program = createShaderProgram(vss, fss);
        this.uniforms = getShaderUniforms(this.program);
        this.context.useProgram(this.program);

        this.camera = camera;

        this.context.uniformMatrix4fv(this.uniforms['proj'].loc, false, camera.getProjectionMatrix());
        this.context.uniform4fv(this.uniforms['color'].loc, ItemDropShader.COLOR);
    }

    public run(model: ModelInterface): void {

        this.context.useProgram(this.program);
        this.context.uniformMatrix4fv(this.uniforms['camera'].loc, false, this.camera.getView());;
        this.context.uniformMatrix4fv(this.uniforms['view'].loc, false, model.view as Matrix4);

        this.render(model);
    }

    public render(model: ModelInterface): void {
        const { context } = this;
        const { mesh } = model;

        context.blendFunc(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA);

        context.bindVertexArray(mesh.vao);
        context.enable(context.BLEND);
        context.enable(context.CULL_FACE);

        context.drawElements(mesh.drawMode, mesh.indexCount, context.UNSIGNED_SHORT, 0);
    }
}