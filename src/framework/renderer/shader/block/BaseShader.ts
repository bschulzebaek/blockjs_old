import AttributeInterface from '../AttributeInterface';
import createShaderProgram from '../utility/create-program';
import getShaderUniforms from '../utility/get-uniforms';
import createTexture from '../utility/create-texture';
import CameraInterface from '../../../scene/camera/CameraInterface';
import WorldInterface from '../../../scene/world/WorldInterface';
import ChunkInterface from '../../../scene/world/chunk/ChunkInterface';
import Container from '../../../Container';
import { Matrix4 } from '../../../../math';
import ModelInterface from '../../../scene/model/ModelInterface';

export default class BaseShader {
    static TEXTURE = 'textures.png';

    protected context: WebGL2RenderingContext;
    private camera: CameraInterface;
    private world: WorldInterface;
    protected uniforms: Record<string, AttributeInterface>;
    protected texture: WebGLTexture;
    private program: WebGLProgram;

    constructor(camera: CameraInterface, world: WorldInterface, vss: string, fss: string) {
        this.context = Container.getContext();
        this.program = createShaderProgram(vss, fss);
        this.uniforms = getShaderUniforms(this.program);

        this.context.useProgram(this.program);

        this.camera = camera;
        this.world = world;

        this.texture = createTexture(BaseShader.TEXTURE);
        this.context.uniformMatrix4fv(this.uniforms['proj'].loc, false, camera.projectionMatrix);
    }

    public run(): void {
        this.context.useProgram(this.program);
        this.context.uniformMatrix4fv(this.uniforms['camera'].loc, false, this.camera.view);
        this.context.activeTexture(this.context['TEXTURE0']);
        this.context.bindTexture(this.context.TEXTURE_2D, this.texture);
        this.context.uniform1i(this.uniforms['tex0'].loc, 0);

        this.preRender();
        this.render();
    }

    private render(): void {
        const { context } = this;

        context.enable(context.DEPTH_TEST);
        context.depthMask(true);
        context.enable(context.BLEND);
        context.enable(context.CULL_FACE);

        this.world.getChunks().forEach(this.renderChunk);
    }

    private renderChunk= (chunk: ChunkInterface) => {
        const model = this.getChunkModel(chunk);

        const { context } = this;
        const { mesh, view } = model;

        context.uniformMatrix4fv(this.uniforms['view'].loc, false, view as Matrix4);
        context.bindVertexArray(mesh.vao);
        context.drawElements(mesh.drawMode, mesh.indexCount, context.UNSIGNED_SHORT, 0);
    }

    protected preRender() {
        throw new Error('Must be implemented!');
    }

    protected getChunkModel(chunk: ChunkInterface): ModelInterface {
        throw new Error('Must be implemented!');
    }
}