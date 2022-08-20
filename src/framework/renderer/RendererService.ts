import ServiceInterface from '../ServiceInterface';
import Renderer from './Renderer';
import SceneInterface from '../scene/SceneInterface';

export default class RendererService implements ServiceInterface {
    private renderer!: Renderer;

    constructor() {
        this.renderer = new Renderer();
    }

    public isRunning() {
        return !this.renderer.getPaused();
    }

    public setScene(scene: SceneInterface) {
        this.renderer.setScene(scene);
    }

    public start() {
        if (!this.renderer.getPaused()) {
            return;
        }

        this.renderer.setPaused(false);
        this.renderer.loop(0, 0);
    }

    public stop() {
        if (this.renderer.getPaused()) {
            return;
        }

        this.renderer.setPaused(true);
    }

    public async create(): Promise<void> {

    }

    public async discard(): Promise<void> {
        this.stop();
    }
}