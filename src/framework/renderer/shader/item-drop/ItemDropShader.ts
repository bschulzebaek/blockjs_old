import { Matrix4 } from '../../../../common/math';
import Container from '../../../container/Container';
import AttributeInterface from '../../AttributeInterface';
import createShaderProgram from '../../utility/create-program';
import getShaderUniforms from '../../utility/get-uniforms';
import ModelInterface from '../../../scene/model/ModelInterface';
import fss from './fss';
import vss from './vss';
import type Camera from '../../../../client/camera/Camera';

export default class ItemDropShader {
    static COLOR = [0.0, 0.0, 1.0, 0.7];

    static TEXTURE = 'textures.png';

    private camera: Camera;

    private context: WebGL2RenderingContext;
    private program: WebGLProgram;
    private uniforms: Record<string, AttributeInterface>;

    constructor() {
        this.context = Container.getContext();
        this.program = createShaderProgram(vss, fss);
        this.uniforms = getShaderUniforms(this.program);
        this.context.useProgram(this.program);

        this.camera = Container.getScene().getSceneObject('camera') as Camera;

        this.context.uniformMatrix4fv(this.uniforms['proj'].loc, false, this.camera.getProjectionMatrix());
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