import CursorInterface from './cursor/CursorInterface';
import CameraInterface from './camera/CameraInterface';
import SceneInterface from './SceneInterface';
import SkyboxInterface from './skybox/SkyboxInterface';
import PlayerController from '../player/PlayerController';
import WorldInterface from '../world/WorldInterface';

export type SceneEntity = CursorInterface | CameraInterface | SkyboxInterface | WorldInterface | PlayerController;

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