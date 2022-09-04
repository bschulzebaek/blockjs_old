import SceneObjectInterface from '../../scene/SceneObjectInterface';
import ModelInterface from '../../scene/model/ModelInterface';
import CameraInterface from '../camera/CameraInterface';
import CubeModel from '../../scene/model/cube/CubeModel';

export default class Skybox implements SceneObjectInterface {
    static SCENE_ID = 'skybox';
    static SHADER = 'skybox';
    static MESH_WIDTH = 300;
    static MESH_HEIGHT = 300;
    static MESH_LENGTH = 300;

    public model!: ModelInterface;
    private camera: CameraInterface;

    constructor(camera: CameraInterface) {
        this.camera = camera;
    }

    public getId() {
        return Skybox.SCENE_ID;
    }

    public getShader() {
        return Skybox.SHADER;
    }

    public update() {
        const { x, z } = this.camera.getTransform().getPosition();

        // @ts-ignore
        this.model.setPosition(x, 0, z);
        this.model.update(0);
    }

    public createModel(): void {
        this.model = CubeModel.create(Skybox.SCENE_ID, Skybox.MESH_HEIGHT, Skybox.MESH_WIDTH, Skybox.MESH_LENGTH);
    }
}