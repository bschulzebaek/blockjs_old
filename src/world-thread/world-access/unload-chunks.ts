import WorldContainer from '../WorldContainer';

export default async function unloadChunks(chunks: string[]) {
    const world = WorldContainer.getWorld();

    chunks.forEach((key) => {
        return world.popChunk(key);
    });
}