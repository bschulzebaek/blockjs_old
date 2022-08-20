import Chunk from '../../world/chunk/Chunk';

export default function addArrayObject(chunk: Chunk, index: number, s1x: number, s1y: number, s1z: number, s2x: number, s2y: number, s2z: number, cx: number, cy: number, cz: number, debug: boolean = false) {
    const x = index % Chunk.WIDTH,
          y = (index / (Chunk.WIDTH * Chunk.LENGTH)) | 0,
          z = ((index / Chunk.WIDTH) | 0) % Chunk.LENGTH,

    side1 = chunk.getBlockId(x + s1x, y + s1y, z + s1z) ? 1 : 0,
    side2 = chunk.getBlockId(x + s2x, y + s2y, z + s2z) ? 1 : 0,
    corner = chunk.getBlockId(x + cx, y + cy, z + cz) ? 1 : 0;

    let vo = 1;

    if (side1 && side2) {
        vo = 0;
    } else {
        vo = (3 - (side1 + side2 + corner)) / 3;
    }

    return debug ? vo : vo * 0.5 + 0.5;
}