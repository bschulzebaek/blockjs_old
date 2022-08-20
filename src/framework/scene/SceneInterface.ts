import { SceneEntities } from './Scene';

export default interface SceneInterface {
    context: WebGL2RenderingContext;
    canvas: HTMLCanvasElement;

    addEntities(...entities: SceneEntities[]): void;
    getEntities(): SceneEntities[];
    update(delta: number): void;
}