import Chunk from '../../chunk/Chunk';

/**
 * Creates 2-dimensional map (Array of X,Z pairs) of chunks in reach of "renderDistance".
 *
 * Examples
 * r = 1: [[0, 0]]
 * r = 3: [[0, 0], [0, 1], [1, 1], [1, 0], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]]
 */
 export default function getChunkMap(renderDistance: number, offsetX: number = 0, offsetZ: number = 0): Map<string, undefined|Chunk> {
    const map = new Map();

    if (renderDistance < 1) {
        throw new Error('Radius must be >= 1!');
    } else if (renderDistance === 1) {
        map.set(Chunk.getId(0, 0), undefined);

        return map;
    }

    for (let x = -renderDistance; x < renderDistance + 1; x++) {
        for (let z = -renderDistance; z < renderDistance + 1; z++) {

            const hypotenuse = Math.sqrt(x * x + z * z);

            if (renderDistance < 8 || hypotenuse <= renderDistance) {
                map.set(Chunk.getId(x + offsetX, z + offsetZ), undefined)
            }

        }
    }

    return map;
}