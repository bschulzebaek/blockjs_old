import { Vector3 } from '../shared/math';
import Chunk from './chunk/Chunk';
import getChunkMap from './utility/get-chunk-map';
import WorldContainer from './WorldContainer';
import setInitialPosition from './utility/set-start-position';
import printStats from './helper/print-stats';
import MessageHandler from './helper/MessageHandler';
import worldSync from './world-sync';
import createChunks from './world-access/create-chunks';
import unloadChunks from './world-access/unload-chunks';
import getInitialPosition from './utility/get-player-offset';

export default class WorldService {
    static VIEW_DISTANCE = 3;

    public async create() {
        await this.createWorld(await getInitialPosition());

        if (WorldContainer.getConfig().getIsNew()) {
            await setInitialPosition();
        }

        MessageHandler.dispatchReady();
    }

    private async createWorld(position: Vector3) {
        const start = performance.now(),
              chunkPosition = this.convertToChunkPosition(position),
              chunkMap = getChunkMap(WorldService.VIEW_DISTANCE, chunkPosition.x, chunkPosition.z);

        await createChunks(Array.from(chunkMap.keys()));

        printStats(start);
    }

    private convertToChunkPosition(position: Vector3) {
        return new Vector3(Math.floor(position.x / Chunk.WIDTH), 0, Math.floor(position.z / Chunk.LENGTH))
    }

    public async updateChunkGrid(position: Vector3) {
        const chunkPos = this.convertToChunkPosition(position),
              newMap = getChunkMap(WorldService.VIEW_DISTANCE, chunkPos.x, chunkPos.z),
              oldMap = WorldContainer.getWorld().getMap(),
              chunksToCreate = Array.from(newMap.keys()).filter((key) => !oldMap.has(key)),
              chunksToRemove = Array.from(oldMap.keys()).filter((key) => !newMap.has(key));

        unloadChunks(chunksToRemove);
        await createChunks(chunksToCreate);
        worldSync(chunksToCreate, chunksToRemove);
    }
}