import SceneContainer from '../SceneContainer';
import MessageHandler from '../MessageHandler';
import Camera from '../../../components/camera/Camera';
import { Vector3 } from '../../../shared/math';
import PlayerController from '../../../components/player/PlayerController';
import getPlayerOffset from '../world-helper/get-player-offset';
import getChunkMap from '../../../components/world/utility/get-chunk-map';
import loadChunks from '../world-helper/load-chunks';
import { VIEW_DISTANCE } from '../../../data/settings';
import Cursor from '../../../components/cursor/Cursor';
import sortChunksByDistance from '../helper/sort-chunks-by-distance';

export default async function createInstance() {
    await loadWorld();
    await loadScene();

    MessageHandler.dispatchReady();
}

async function loadScene() {
    console.debug('Creating scene ...');
    const start = performance.now(),
        scene = SceneContainer.getScene(),
        entityService = SceneContainer.getEntityService();

    await entityService.readAll();

    const camera = new Camera(70, 0.05, 300.0, new Vector3(0, 8, 0)),
        cursor = new Cursor(camera, SceneContainer.getWorld()),
        // skybox = new Skybox(camera),
        player = new PlayerController(camera, entityService.getPlayer(), SceneContainer.getWorld());

    // ToDo: EntityService.getAll().forEach((entity) => { create by entity.type });

    scene.addSceneObjects(camera, cursor/*, skybox*/, player);
    scene.update(0);

    const delta = (performance.now() - start).toFixed(0);

    console.debug(`Done! - ${delta}ms`)
    console.debug({
        scene: SceneContainer.getScene(),
        config: SceneContainer.getConfig().getRaw(),
    });
}

async function loadWorld() {
    const position = await getPlayerOffset(),
        chunkMap = getChunkMap(VIEW_DISTANCE, position.x, position.z),
        chunkIds = Array.from(chunkMap.keys());

    loadChunks(sortChunksByDistance(chunkIds, position));
}