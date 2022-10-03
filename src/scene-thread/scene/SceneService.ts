import PlayerController from '../scene-content/player/PlayerController';
import SceneContainer from '../SceneContainer';
import Scene from './Scene';
import Camera from '../scene-content/camera/Camera';
import Skybox from '../scene-content/skybox/Skybox';
import Cursor from '../scene-content/cursor/Cursor';
import { Vector3 } from '../../shared/math';

export default class SceneService {
    private scene: Scene;

    constructor() {
        this.scene = SceneContainer.getScene();
    }

    public async create() {
        const entityService = SceneContainer.getEntityService();
        await entityService.readAll();

        const camera = new Camera(70, 0.05, 300.0, new Vector3(0, 8, 0)),
              skybox = new Skybox(),
              cursor = new Cursor();

        const entity = entityService.getPlayer(),
              world  = SceneContainer.getWorld();

        const player = new PlayerController(camera, entity, world);

        this.scene.addSceneObjects(camera, skybox, cursor, player);
        this.scene.update(0);
    }
}