import SceneContainer from '../SceneContainer';
import Chunk from '../../../components/chunk/Chunk';
import generateChunk from '../../../components/world/world-generation/generate-chunk';
import syncWorld from '../world-helper/sync-world';

export default async function loadChunks(ids: string[]) {
    const world = SceneContainer.getWorld(),
          repository = SceneContainer.getChunkRepository(),
          createMap: Map<string, Chunk|undefined> = new Map(ids.map((id) => [ id, undefined ])),
          seed = SceneContainer.getConfig().getSeed();

    await repository.readList(createMap);

    createMap.forEach((chunk, id) => {
        if (!chunk) {
            chunk = generateChunk(id, seed);
        }

        world.pushChunk(chunk);

        syncWorld([ id ]);
    });
}