import { SceneEntity } from './Scene';
export default interface SceneInterface {
    addEntities(...entities: SceneEntity[]): void;
    getEntities(): SceneEntity[];
    update(delta: number): void;
}