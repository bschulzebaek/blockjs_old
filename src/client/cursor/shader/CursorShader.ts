import { Matrix4 } from '../../../common/math';
import Container from '../../../framework/container/Container';
import AttributeInterface from '../../../framework/renderer/AttributeInterface';
import createShaderProgram from '../../../framework/renderer/utility/create-program';
import getShaderUniforms from '../../../framework/renderer/utility/get-uniforms';
import ModelInterface from '../../../framework/scene/model/ModelInterface';
import CameraInterface from '../../camera/CameraInterface';
import Cursor from '../Cursor';
import fss from './fss';
import vss from './vss';

export default class CursorShader {

    static COLOR = [1.0, 1.0, 1.0, 0.3];

    private camera: CameraInterface;
    private cursor: Cursor;

    private context: WebGL2RenderingContext;
    private program: WebGLProgram;
    private uniforms: Record<string, AttributeInterface>;

    constructor(camera: CameraInterface, cursor: Cursor) {
        this.context = Container.getContext();
        this.program = createShaderProgram(vss, fss);
        this.uniforms = getShaderUniforms(this.program);
        this.context.useProgram(this.program);

        this.camera = camera;
        this.cursor = cursor;

        this.context.uniformMatrix4fv(this.uniforms['proj'].loc, false, camera.getProjectionMatrix());
        this.context.uniform4fv(this.uniforms['color'].loc, CursorShader.COLOR);
    }

    public run(): void {
        const model = this.cursor.getModel();

        this.context.useProgram(this.program);
        this.context.uniformMatrix4fv(this.uniforms['camera'].loc, false, this.camera.getView());
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