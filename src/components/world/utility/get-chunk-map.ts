import Chunk from '../../chunk/Chunk';

/**
 * Creates 2-dimensional map (Array of X,Z pairs) of chunks in reach of "renderDistance".
 *
 * Examples
 * r = 1: [[0, 0]]
 * r = 3: [[0, 0], [0, 1], [1, 1], [1, 0], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]]
 */
 export default function getChunkMap(renderDistance: number, offsetX: number, offsetZ: number, addChunks: boolean): Map<string, undefined|Chunk> {
    const map = new Map();

    if (renderDistance < 1) {
        throw new Error('Radius must be >= 1!');
    } else if (renderDistance === 1) {
        map.set(Chunk.worldToId(0, 0), addChunks ? new Chunk(0, 0) : undefined);

        return map;
    }

    for (let x = -renderDistance; x < renderDistance + 1; x++) {
        for (let z = -renderDistance; z < renderDistance + 1; z++) {

            const hypotenuse = Math.sqrt(x * x + z * z);

            if (renderDistance < 8 || hypotenuse <= renderDistance) {
                const chunk = addChunks ? new Chunk(x + offsetX, z + offsetZ) : undefined;
                const id = chunk ? chunk.getId() : Chunk.worldToId(x + offsetX, z + offsetZ);

                map.set(id, chunk);
            }

        }
    }

    return map;
}