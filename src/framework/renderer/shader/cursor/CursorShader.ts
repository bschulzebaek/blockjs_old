import fss from './fss';
import vss from './vss';
import CameraInterface from '../../../scene/camera/CameraInterface';
import CursorInterface from '../../../scene/cursor/CursorInterface';
import AttributeInterface from '../AttributeInterface';
import createShaderProgram from '../utility/create-program';
import getShaderUniforms from '../utility/get-uniforms';
import ModelInterface from '../../../scene/model/ModelInterface';
import { Matrix4 } from '../../../../math';
import Container from '../../../Container';

export default class CursorShader {

    static COLOR = [1.0, 1.0, 1.0, 0.3];

    private camera: CameraInterface;
    private cursor: CursorInterface;

    private context: WebGL2RenderingContext;
    private program: WebGLProgram;
    private uniforms: Record<string, AttributeInterface>;

    constructor(camera: CameraInterface, cursor: CursorInterface) {
        this.context = Container.getContext();
        this.program = createShaderProgram(vss, fss);
        this.uniforms = getShaderUniforms(this.program);
        this.context.useProgram(this.program);

        this.camera = camera;
        this.cursor = cursor;

        this.context.uniformMatrix4fv(this.uniforms['proj'].loc, false, camera.projectionMatrix);
        this.context.uniform4fv(this.uniforms['color'].loc, CursorShader.COLOR);
    }

    public run(): void {
        this.context.useProgram(this.program);
        this.context.uniformMatrix4fv(this.uniforms['camera'].loc, false, this.camera.view);;
        this.context.uniformMatrix4fv(this.uniforms['view'].loc, false, (this.cursor.model as ModelInterface).view as Matrix4);

        this.render();
    }

    public render(): void {
        const { context } = this;
        const { model } = this.cursor;
        const { mesh } = model as ModelInterface;

        context.blendFunc(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA);

        context.bindVertexArray(mesh.vao);
        context.enable(context.BLEND);
        context.enable(context.CULL_FACE);

        context.drawElements(mesh.drawMode, mesh.indexCount, context.UNSIGNED_SHORT, 0);
    }
}