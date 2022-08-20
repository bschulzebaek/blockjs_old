import createShaderProgram from '../utility/create-program';
import fss from './fss';
import vss from './vss';
import getShaderUniforms from '../utility/get-uniforms';
import CameraInterface from '../../../scene/camera/CameraInterface';
import WorldInterface from '../../../scene/world/WorldInterface';
import AttributeInterface from '../AttributeInterface';
import createTexture from '../utility/create-texture';
import ChunkInterface from '../../../scene/world/chunk/ChunkInterface';
import Matrix4 from '../../../../math/Matrix4';

export default class GlassShader {
    static TEXTURE = 'textures.png';

    private camera: CameraInterface;
    private world: WorldInterface;
    private context: WebGL2RenderingContext;
    private uniforms: Record<string, AttributeInterface>;
    private texture: WebGLTexture;
    private program: WebGLProgram;

    constructor(context: WebGL2RenderingContext, camera: CameraInterface, world: WorldInterface) {
        this.context = context;
        this.program = createShaderProgram(context, vss, fss);
        this.uniforms = getShaderUniforms(context, this.program);

        this.context.useProgram(this.program);

        this.camera = camera;
        this.world = world;

        this.texture = createTexture(context, GlassShader.TEXTURE);
        this.context.uniformMatrix4fv(this.uniforms['proj'].loc, false, camera.projectionMatrix);
    }

    public run(): void {
        this.context.useProgram(this.program);
        this.context.uniformMatrix4fv(this.uniforms['camera'].loc, false, this.camera.view);
        this.context.activeTexture(this.context['TEXTURE0']);
        this.context.bindTexture(this.context.TEXTURE_2D, this.texture);
        this.context.uniform1i(this.uniforms['tex0'].loc, 0);

        this.render();
    }

    private render(): void {
        const { context } = this;

        context.enable(context.DEPTH_TEST);
        context.enable(context.BLEND);
        context.disable(context.CULL_FACE);
        context.blendFunc(context.ONE, context.ONE_MINUS_SRC_ALPHA);

        this.world.getChunks().forEach(this.renderChunk);
    }

    private renderChunk = (chunk: ChunkInterface): void => {
        const glassModel = chunk.getGlassModel();

        if (!glassModel) {
            return;
        }

        const { context } = this;
        const { mesh, view } = glassModel;

        this.context.uniformMatrix4fv(this.uniforms['view'].loc, false, view as Matrix4);
        context.bindVertexArray(mesh.vao);
        context.drawElements(mesh.drawMode, mesh.indexCount, context.UNSIGNED_SHORT, 0);
    }
}