import ShaderRegistry from './ShaderRegistry';
import Loop from '../../shared/utility/Loop';
import RenderObject from '../../framework/shader/RenderObject';
import prepareCanvas from './utility/prepare-canvas';
import groupByShader from './utility/group-by-shader';

export default class Renderer {
    static FPS_THRESHOLD = 59.5;

    private readonly loop = new Loop(this.render.bind(this));
    private readonly context: WebGL2RenderingContext;
    private readonly shaderRegistry = new ShaderRegistry();

    private projection: Float32Array = new Float32Array();
    private view: Float32Array = new Float32Array();

    public renderObjects: Map<string, RenderObject> = new Map();
    public chunkSolidObjects: Map<string, RenderObject> = new Map();
    public chunkGlassObjects: Map<string, RenderObject> = new Map();

    constructor(canvas: OffscreenCanvas) {
        prepareCanvas(canvas);
        this.context = canvas.getContext('webgl2')!;
        this.shaderRegistry.compileShaders(this.context);
    }

    public getContext() {
        return this.context;
    }

    public start() {
        if (!this.projection ||
            !this.projection.length ||
            !this.view ||
            !this.view.length
        ) {
            throw new Error();
        }

        this.loop.start();
    }

    public stop() {
        this.loop.stop();
    }

    private render(delta: number): void {
        const { projection, view } = this;

        // ToDo: Set proj and view uniforms before render loop, not per shader execution!

        groupByShader(this.renderObjects).forEach((ros, shader) => {
            this.shaderRegistry.get(shader)!.run(ros, projection, view);
        });

        this.logFps(delta);
    }

    public syncCamera(data: { projection: Float32Array, view: Float32Array }) {
        this.projection = data.projection;
        this.view = data.view;
    }

    public syncChunk(data: any) {
        setTimeout(() => { new RenderObject(this.context, data.glass )});
        setTimeout(() => { new RenderObject(this.context, data.solid )});
    }

    public removeChunks(chunkIds: string[]) {
        chunkIds.forEach((chunkId) => {
            if (this.chunkSolidObjects.has(chunkId)) {
                this.chunkSolidObjects.delete(chunkId);
            }

            if (this.chunkGlassObjects.has(chunkId)) {
                this.chunkGlassObjects.delete(chunkId);
            }
        });
    }

    public removeSceneObjects(ids: string[]) {
        ids.forEach((id) => {
            this.renderObjects.delete(id);
        });
    }

    private logFps(delta: number) {
        const fps = parseFloat((1 / delta).toFixed(1));

        // @ts-ignore
        if (self.__DEBUG__ && fps < Renderer.FPS_THRESHOLD) {
            console.warn('FPS: ' + fps);
        }
    }
}