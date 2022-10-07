import Chunk from '../../../chunk/Chunk';
import shapeTerrain from './shape-terrain'
import fillWaterBodies from './fill-water-bodies';
import paintSurface from './paint-surface';

export default function generationV1(id: string, seed: string) {
    const blocks = Chunk.getEmptyBlocks();

    try {
        const [cx, cz] = id.split(':'),
            xInt = parseInt(cx),
            zInt = parseInt(cz);

        shapeTerrain(seed, xInt, zInt, blocks);
        fillWaterBodies(blocks);
        paintSurface(blocks);

        return new Chunk(xInt, zInt, blocks);
    } catch(e) {
        console.error(e);
        console.debug(id, seed);

        return null;
    }
}