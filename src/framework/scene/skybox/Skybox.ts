import SkyboxShader from '../../renderer/shader/skybox/SkyboxShader';
import CameraInterface from '../camera/CameraInterface';
import CubeModel from '../model/CubeModel';
import SkyboxInterface from './SkyboxInterface';

export default class Skybox implements SkyboxInterface {
    static MESH_NAME = 'skybox';
    static MESH_WIDTH = 300;
    static MESH_HEIGHT = 300;
    static MESH_LENGTH = 300;

    private model: any;
    private shader: SkyboxShader;

    constructor(camera: CameraInterface) {
        this.shader = new SkyboxShader(camera);
        this.model = CubeModel.create(Skybox.MESH_NAME, Skybox.MESH_HEIGHT, Skybox.MESH_WIDTH, Skybox.MESH_LENGTH);
    }

    public update() {
        this.shader.run(this.model);
    }
}