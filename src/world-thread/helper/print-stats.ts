import logger from '../../shared/utility/logger';
import WorldContainer from '../WorldContainer';
import Chunk from '../chunk/Chunk';

export default function(start: number) {
    const delta = (performance.now() - start).toFixed(0)

    logger(`[WorldService] Generating chunks took: ${delta}ms.`)
    logger({
        chunks: WorldContainer.getWorld().getChunks().length,
        blocks: WorldContainer.getWorld().getChunks().length * Chunk.HEIGHT * Chunk.WIDTH * Chunk.LENGTH,
    });
}