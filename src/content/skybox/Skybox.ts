import SkyboxShader from '../../core/renderer/shader/skybox/SkyboxShader';
import CubeModel from '../../core/scene/model/cube/CubeModel';
import ModelInterface from '../../core/scene/model/ModelInterface';
import SceneObject from '../../core/scene/SceneObject';
import CameraInterface from '../camera/CameraInterface';

export default class Skybox extends SceneObject {
    static MESH_NAME = 'skybox';
    static MESH_WIDTH = 300;
    static MESH_HEIGHT = 300;
    static MESH_LENGTH = 300;

    private model!: ModelInterface;
    private shader!: SkyboxShader;
    private camera: CameraInterface;

    constructor(camera: CameraInterface) {
        super();

        this.camera = camera;
    }

    public update() {
        const { x, z } = this.camera.transform.position;

        // @ts-ignore
        this.model.setPosition(x, 0, z);
        this.model.update(0);

        this.shader.run(this.model);
    }

    public createShader() {
        this.shader = new SkyboxShader();
    }

    public createModel(): void {
        this.model = CubeModel.create(Skybox.MESH_NAME, Skybox.MESH_HEIGHT, Skybox.MESH_WIDTH, Skybox.MESH_LENGTH);
    }
}