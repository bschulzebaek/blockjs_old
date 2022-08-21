import ServiceInterface from '../ServiceInterface';
import Renderer from './Renderer';
import SceneInterface from '../scene/SceneInterface';
import Container from '../Container';
import { ServiceName } from '../Container';

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

        const scene = Container.getService(ServiceName.SCENE).getScene();

        if (!scene) {
            throw new Error('[Renderer] Missing Scene!');
        }

        this.setScene(scene);

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