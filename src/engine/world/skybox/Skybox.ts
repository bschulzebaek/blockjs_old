import SkyboxShader from '../../__old/framework/renderer/shader/skybox/SkyboxShader';
import CubeModel from '../../__old/framework/scene/model/cube/CubeModel';
import ModelInterface from '../../__old/framework/scene/model/ModelInterface';
import CameraInterface from '../../__old/client/camera/CameraInterface';
import SceneObjectInterface from '../../__old/framework/scene/SceneObjectInterface';
import Container from '../../__old/framework/container/Container';

export default class Skybox implements SceneObjectInterface {
    static SCENE_ID = 'skybox';
    static MESH_WIDTH = 300;
    static MESH_HEIGHT = 300;
    static MESH_LENGTH = 300;

    private model!: ModelInterface;
    private shader!: SkyboxShader;
    private camera: CameraInterface;

    constructor(camera: CameraInterface) {
        this.camera = camera;
    }

    public getId() {
        return Skybox.SCENE_ID;
    }

    public update() {
        const { x, z } = this.camera.getTransform().getPosition();

        // @ts-ignore
        this.model.setPosition(x, 0, z);
        this.model.update(0);

        this.shader.run(this.model);
    }

    public createShaderReference() {
        this.shader = Container.getShader('skybox');
    }

    public createModel(): void {
        this.model = CubeModel.create(Skybox.SCENE_ID, Skybox.MESH_HEIGHT, Skybox.MESH_WIDTH, Skybox.MESH_LENGTH);
    }
}