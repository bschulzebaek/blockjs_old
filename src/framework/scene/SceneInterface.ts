import SceneObject from './SceneObject';

export default interface SceneInterface {
    addEntities(...entities: SceneObject[]): void;
    getEntities(): SceneObject[];
    update(delta: number): void;
}