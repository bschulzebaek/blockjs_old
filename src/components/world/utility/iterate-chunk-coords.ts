import Chunk from '../../chunk/Chunk';

export function iterateChunk3D(callback: (x: number, y: number, z: number) => void) {
    for (let x = 0; x < Chunk.WIDTH; x++) {
        for (let z = 0; z < Chunk.LENGTH; z++) {
            for (let y = 0; y < Chunk.HEIGHT; y++) {
                callback(x, y, z);
            }
        }
    }
}

export function iterateChunk3DVertically(callback: (x: number, y: number, z: number) => void, direction = 1) {
    if (direction === 1) {
        for (let y = 0; y < Chunk.HEIGHT; y++) {
            for (let x = 0; x < Chunk.WIDTH; x++) {
                for (let z = 0; z < Chunk.LENGTH; z++) {
                    callback(x, y, z);
                }
            }
        }
    } else {
        for (let y = Chunk.HEIGHT - 1; y >= 0; y--) {
            for (let x = 0; x < Chunk.WIDTH; x++) {
                for (let z = 0; z < Chunk.LENGTH; z++) {
                    callback(x, y, z);
                }
            }
        }
    }
}

export function iterateChunk2D(callback: (x: number, z: number) => void) {
    for (let x = 0; x < Chunk.WIDTH; x++) {
        for (let z = 0; z < Chunk.LENGTH; z++) {
            callback(x, z);
        }
    }
}