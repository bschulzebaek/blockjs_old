import ShaderRegistry from './ShaderRegistry';
import Loop from '../shared/utility/Loop';
import RenderObject from './RenderObject';
import prepareCanvas from './helper/prepare-canvas';

interface ChunkRenderObject {
    glass: RenderObject | null;
    solid: RenderObject | null;
}

export default class Renderer {
    private loop = new Loop(this.render.bind(this));

    private readonly context: WebGL2RenderingContext;
    private projection: Float32Array = new Float32Array();
    private view: Float32Array = new Float32Array();
    private sceneObjects: RenderObject[] = [];
    private worldObjects: Record<string, ChunkRenderObject> = {};

    private shaderRegistry = new ShaderRegistry();

    constructor(canvas: OffscreenCanvas) {
        prepareCanvas(canvas);
        this.context = canvas.getContext('webgl2')!;
        this.shaderRegistry.compileShaders(this.context);
    }

    public start() {
        this.loop.start();
    }

    public stop() {
        this.loop.stop();
    }

    private render(delta: number): void {
        const { projection, view } = this;

        Object.values(this.worldObjects).forEach((cro) => {
            const { glass, solid } = cro;

            if (glass) {
                this.shaderRegistry.get(glass.shader).run(glass, projection, view);
            }

            if (solid) {
                this.shaderRegistry.get(solid.shader).run(solid, projection, view);
            }
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

    public syncWorld(data: any) {
        data.remove.forEach((chunkId: string) => {
            if (this.worldObjects[chunkId]) {
                delete this.worldObjects[chunkId];
            }
        });

        const { context } = this,
            newChunks = Object.entries(data.add);

        newChunks.forEach(([ id, chunkData ]: [ id: string, chunkData: any ]) => {
            if (!this.worldObjects[id]) {
                this.worldObjects[id] = { solid: null, glass: null };
            }

            this.worldObjects[id].glass = new RenderObject(context, chunkData.glass);
            this.worldObjects[id].solid = new RenderObject(context, chunkData.solid);
        });
    }

    private logFps(delta: number) {
        const fps = parseFloat((1 / delta).toFixed(1));

        if (fps < 59.5) {
            console.warn('FPS: ' + fps);
        }
    }
}