import SceneObjectInterface from '../../threads/scene/scene/SceneObjectInterface';
import Model3DInterface from '../../shared/model/Model3DInterface';
import CubeModel from '../../shared/model/cube/CubeModel';
import { ShaderName } from '../../framework/shader/shader-names';
import CameraInterface from '../camera/CameraInterface';

export default class Skybox implements SceneObjectInterface {
    static SCENE_ID = 'skybox';
    static SHADER = ShaderName.SKYBOX;
    static MESH_WIDTH = 300;
    static MESH_HEIGHT = 300;
    static MESH_LENGTH = 300;

    public model!: Model3DInterface;
    private camera: CameraInterface;

    constructor(camera: CameraInterface) {
        this.camera = camera;
        this.createModel();
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
        this.model = CubeModel.create(Skybox.SCENE_ID, Skybox.SHADER, Skybox.MESH_HEIGHT, Skybox.MESH_WIDTH, Skybox.MESH_LENGTH);
    }

    public getRenderData() {
        return this.model.toRawRenderObject();
    }
}
