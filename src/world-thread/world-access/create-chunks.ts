import WorldContainer from '../WorldContainer';
import Chunk from '../chunk/Chunk';
import generateChunk from '../world-generation/generate-chunk';

export default async function createChunks(ids: string[]) {
    const world = WorldContainer.getWorld(),
          createMap: Map<string, Chunk|undefined> = new Map(ids.map((id) => [ id, undefined ]));

    await WorldContainer.getChunkRepository().readList(createMap);

    createMap.forEach((chunk, id) => {
        if (!chunk) {
            chunk = generateChunk(id);
        }

        world.pushChunk(chunk!);
    });
}
