import RendererInterface from './RendererInterface';
import ShaderInterface from './shader/ShaderInterface';
import SceneInterface from '../scene/SceneInterface';

export default class Renderer implements RendererInterface {
    private paused: boolean = true;
    private shader: ShaderInterface[] = [];
    private scene!: SceneInterface;

    constructor() {

    }

    public setScene(scene: SceneInterface) {
        this.scene = scene;
    }

    public setPaused(paused: boolean) {
        if (paused === this.paused) {
            return;
        }

        this.paused = paused;

        console.log(`[Renderer] ${paused ? 'Stop' : 'Start'}`);
    }

    public getPaused() {
        return this.paused;
    }

    public runFrame(): void {
        this.render(0);
    }

    public loop(time: number, lastTime: number) {
        if (this.paused) {
            return;
        }

        this.render(this.getDelta(time, lastTime));
        window.requestAnimationFrame((newTime) => this.loop(newTime, time));
    }

    private render(delta: number): void {
        this.logFps(delta);
        this.scene.update(delta);
    }

    private getDelta(time: number, lastTime: number): number {
        return Math.min(time - lastTime, 100) / 1000;
    }

    private logFps(delta: number) {
        const el = document.querySelector('.fps-container')

        if (!el) {
            return;
        }

        el.innerHTML = (1 / delta).toFixed(1);
    }
}