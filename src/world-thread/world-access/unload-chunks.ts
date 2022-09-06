import WorldContainer from '../WorldContainer';

export default async function unloadChunks(chunks: string[]) {
    const world = WorldContainer.getWorld();

    const saveChunks = chunks.map((key) => {
        return world.popChunk(key);
    });

    await WorldContainer.getChunkRepository().writeList(saveChunks);
}