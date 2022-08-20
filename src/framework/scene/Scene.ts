// import SceneInterface from './SceneInterface';
// import ModelInterface from './utility/ModelInterface';
// import CursorInterface from './cursor/CursorInterface';
import CameraInterface from './camera/CameraInterface';
import SceneInterface from './SceneInterface';
import SkyboxInterface from './skybox/SkyboxInterface';
// import WorldInterface from '../world/WorldInterface';
// import PlayerInterface from './player/PlayerInterface';

export type SceneEntity = CameraInterface | SkyboxInterface;
// export type SceneEntities = ModelInterface | CursorInterface | CameraInterface | SkyboxInterface | WorldInterface | PlayerInterface;

export default class Scene implements SceneInterface {
    private entities: SceneEntity[] = [];

    constructor() {

    }

    public addEntity(entity: SceneEntity): void {
        this.entities.push(entity);
    }

    public addEntities(...entities: SceneEntity[]): void {
        this.entities.push(...entities);
    }

    public getEntities(): SceneEntity[] {
        return this.entities;
    }

    public update(delta: number): void {

        this.getEntities().forEach((entity) => {
            entity.update(delta);
        });
    }
}