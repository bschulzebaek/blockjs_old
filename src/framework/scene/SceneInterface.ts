import { SceneEntities } from './Scene';

export default interface SceneInterface {
    addEntities(...entities: SceneEntities[]): void;
    getEntities(): SceneEntities[];
    update(delta: number): void;
}