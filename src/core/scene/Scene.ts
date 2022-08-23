import SceneInterface from './SceneInterface';
import Container, { ServiceName } from '../Container';
import SceneObject from './SceneObject';
import CameraInterface from '../../content/camera/CameraInterface';

export default class Scene implements SceneInterface {
    private entities: SceneObject[] = [];

    private camera: CameraInterface;
    private skybox: SceneObject;
    private cursor: SceneObject;

    constructor(camera: CameraInterface, skybox: SceneObject, cursor: SceneObject) {
        this.camera = camera;
        this.skybox = skybox;
        this.cursor = cursor;
    }

    public addEntity(entity: SceneObject): void {
        this.entities.push(entity);
    }

    public addEntities(...entities: SceneObject[]): void {
        this.entities.push(...entities);
    }

    public getEntities(): SceneObject[] {
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