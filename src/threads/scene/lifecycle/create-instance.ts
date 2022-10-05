import SceneContainer from '../SceneContainer';
import MessageHandler from '../MessageHandler';
import Camera from '../../../components/camera/Camera';
import { Vector3 } from '../../../shared/math';
import PlayerController from '../../../components/player/PlayerController';
import getInitialPosition from '../world-helper/get-player-offset';
import getChunkMap from '../../../components/world/utility/get-chunk-map';
import Chunk from '../../../components/chunk/Chunk';
import loadChunks from '../world-helper/load-chunks';
import { VIEW_DISTANCE } from '../../../data/settings';
import Cursor from '../../../components/cursor/Cursor';
import Skybox from '../../../components/skybox/Skybox';

export default async function createInstance() {
    console.debug('Creating scene ...');
    const start = performance.now();

    await loadWorld();
    await loadScene();

    printStats(start);
    MessageHandler.dispatchReady();
}

async function loadScene() {
    const scene = SceneContainer.getScene(),
          entityService = SceneContainer.getEntityService();

    await entityService.readAll();

    const camera = new Camera(70, 0.05, 300.0, new Vector3(0, 8, 0)),
          cursor = new Cursor(camera, SceneContainer.getWorld()),
          skybox = new Skybox(camera),
          player = new PlayerController(camera, entityService.getPlayer(), SceneContainer.getWorld());

    // ToDo: EntityService.getAll().forEach((entity) => { create entity.type });

    scene.addSceneObjects(camera, cursor, skybox, player);
    scene.update(0);
}

async function loadWorld() {
    const position = await getInitialPosition(),
          chunkPosition = Chunk.convertToChunkPosition(position),
          chunkMap = getChunkMap(VIEW_DISTANCE, chunkPosition.x, chunkPosition.z),
          chunkIds = Array.from(chunkMap.keys());

    await loadChunks(chunkIds);
}

function printStats(start: number) {
    const delta = (performance.now() - start).toFixed(0)

    console.debug(`Done! - ${delta}ms`)
    console.debug({
        chunks: SceneContainer.getWorld().getChunks().length,
        blocks: SceneContainer.getWorld().getChunks().length * Chunk.HEIGHT * Chunk.WIDTH * Chunk.LENGTH,
        scene: SceneContainer.getScene(),
        config: SceneContainer.getConfig().getRaw(),
    });
}