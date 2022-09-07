import WorldContainer from '../WorldContainer';
import worldSync from '../world-sync';

export default async function unloadChunks(chunks: string[] = []) {
    const world = WorldContainer.getWorld();

    chunks.forEach((key) => {
        return world.popChunk(key);
    });

    worldSync([], chunks);
}