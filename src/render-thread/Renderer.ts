import ShaderRegistry from './shader/ShaderRegistry';
import Loop from '../shared/utility/Loop';
import RenderObject from './RenderObject';
import prepareCanvas from './helper/prepare-canvas';
import './subscriber';
import syncChunk from './render-object/sync-chunk';

interface ChunkRenderObject {
    glass: RenderObject | null;
    solid: RenderObject | null;
}

export default class Renderer {
    static FPS_THRESHOLD = 59.5;

    private readonly loop = new Loop(this.render.bind(this));
    private readonly context: WebGL2RenderingContext;
    private readonly shaderRegistry = new ShaderRegistry();

    private projection: Float32Array = new Float32Array();
    private view: Float32Array = new Float32Array();
    private sceneObjects: RenderObject[] = [];
    private worldObjects: Record<string, ChunkRenderObject> = {};

    constructor(canvas: OffscreenCanvas) {
        prepareCanvas(canvas);
        this.context = canvas.getContext('webgl2')!;
        this.shaderRegistry.compileShaders(this.context);
    }

    public getContext() {
        return this.context;
    }

    public getWorldObjects() {
        return this.worldObjects;
    }

    public start() {
        this.loop.start();
    }

    public stop() {
        this.loop.stop();
    }

    private render(delta: number): void {
        const { projection, view } = this;

        const glassShader = this.shaderRegistry.get('chunk-glass'),
              solidShader = this.shaderRegistry.get('chunk-solid');

        Object.values(this.worldObjects).forEach((cro) => {
            const { glass, solid } = cro;

            glassShader.run(glass, projection, view);
            solidShader.run(solid, projection, view);
        })

        this.sceneObjects.forEach((ro) => {
            this.shaderRegistry.get(ro.shader).run(ro, projection, view);
        });

        this.logFps(delta);
    }

    public syncSceneObjects(data: any) {
        this.projection = data.projection;
        this.view = data.view;

        this.sceneObjects = data.objects.map((obj: any) => new RenderObject(this.context, obj));
    }

    public syncChunk(data: any) {
        syncChunk(data);
    }

    public removeChunks(chunkIds: string[]) {
        chunkIds.forEach((chunkId) => {
            if (this.worldObjects[chunkId]) {
                delete this.worldObjects[chunkId];
            }
        });
    }

    private logFps(delta: number) {
        const fps = parseFloat((1 / delta).toFixed(1));

        // @ts-ignore
        if (fps < FPS_THRESHOLD && self.__DEBUG__) {
            console.warn('FPS: ' + fps);
        }
    }
}