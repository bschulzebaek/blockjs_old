import CursorInterface from './cursor/CursorInterface';
import CameraInterface from './camera/CameraInterface';
import SceneInterface from './SceneInterface';
import SkyboxInterface from './skybox/SkyboxInterface';
import PlayerController from '../player/PlayerController';
import WorldInterface from '../world/WorldInterface';
import Container, { ServiceName } from '../Container';

export type SceneEntity = CursorInterface | CameraInterface | SkyboxInterface | WorldInterface | PlayerController;

export default class Scene implements SceneInterface {
    private entities: SceneEntity[] = [];

    private camera: CameraInterface;
    private skybox: SkyboxInterface;
    private cursor: CursorInterface;

    constructor(camera: CameraInterface, skybox: SkyboxInterface, cursor: CursorInterface) {
        this.camera = camera;
        this.skybox = skybox;
        this.cursor = cursor;
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

        this.camera.update(delta);
        this.skybox.update(delta);
        Container.getService(ServiceName.WORLD).getWorld().update();
        this.cursor.update(delta);
    }
}