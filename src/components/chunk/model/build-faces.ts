import { ChunkDirections, ChunkFaces, ChunkIndex, ChunkUV } from '../../../data/chunk-faces';
import Chunk from '../Chunk';

function addArrayObject(chunk: Chunk, index: number, s1x: number, s1y: number, s1z: number, s2x: number, s2y: number, s2z: number, cx: number, cy: number, cz: number, debug: boolean = false) {
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

function appendQuad(faceDir: number, x: number, y: number, z: number, verts: number[], inds: number[], uvs: number[], normals: number[]) {
    const face = ChunkFaces[faceDir];
    const v = face.v;
    const indOffset = verts.length / 3;

    if (face.nOffset) {
        x += face.n[0];
        y += face.n[1];
        z += face.n[2];
    }

    for (let i = 0; i < 4; i++) {
        verts.push(v[i * 3] + x, v[i * 3 + 1] + y, v[i * 3 + 2] + z);
        normals.push(...face.n);
    }

    ChunkUV.forEach(uv => uvs.push(uv));

    for (let i = 0; i < ChunkIndex.length; i++) {
        inds.push(ChunkIndex[i] + indOffset);
    }
}

export default function buildFaces(chunk: Chunk, blockIndex: number, faces: number[], verts: number[], inds: number[], uvs: number[], normals: number[], arrayObject: number[], j: number, x: number, y: number, z: number, xf: number, yf: number) {
    appendQuad(j, x, y, z, verts, inds, uvs, normals);
    faces.push(xf, yf, xf, yf, xf, yf, xf, yf);

    for (let k = 0; k < 4; k++) {
        if (j === ChunkDirections.UP) {
            // @ts-ignore
            arrayObject.push(addArrayObject(chunk, blockIndex, ...[
                [-1, 1, 0, 0, 1, 1, -1, 1, 1], // SW
                [1, 1, 0, 0, 1, 1, 1, 1, 1], // SE
                [1, 1, 0, 0, 1, -1, 1, 1, -1], // NE
                [-1, 1, 0, 0, 1, -1, -1, 1, -1] // NW
            ][k]));
        } else if (j === ChunkDirections.DOWN) {
            // @ts-ignore
            arrayObject.push(addArrayObject(chunk, blockIndex, ...[
                [-1, -1, 0, 0, -1, -1, -1, -1, -1],
                [1, -1, 0, 0, -1, -1, 1, -1, -1],
                [1, -1, 0, 0, -1, 1, 1, -1, 1],
                [-1, -1, 0, 0, -1, 1, -1, -1, 1]
            ][k]));
        } else if (j === ChunkDirections.NORTH) {
            // @ts-ignore
            arrayObject.push(addArrayObject(chunk, blockIndex, ...[
                [0, -1, -1, 1, 0, -1, 1, -1, -1],
                [0, -1, -1, -1, 0, -1, -1, -1, -1],
                [0, 1, -1, -1, 0, -1, -1, 1, -1],
                [0, 1, -1, 1, 0, -1, 1, 1, -1]
            ][k]));
        } else if (j === ChunkDirections.SOUTH) {
            // @ts-ignore
            arrayObject.push(addArrayObject(chunk, blockIndex, ...[
                [0, -1, 1, -1, 0, 1, -1, -1, 1],
                [0, -1, 1, 1, 0, 1, 1, -1, 1],
                [0, 1, 1, 1, 0, 1, 1, 1, 1],
                [0, 1, 1, -1, 0, 1, -1, 1, 1]
            ][k]));
        } else if (j === ChunkDirections.EAST) {
            // @ts-ignore
            arrayObject.push(addArrayObject(chunk, blockIndex, ...[
                [-1, -1, 0, -1, 0, -1, -1, -1, -1],
                [-1, -1, 0, -1, 0, 1, -1, -1, 1],
                [-1, 1, 0, -1, 0, 1, -1, 1, 1],
                [-1, 1, 0, -1, 0, -1, -1, 1, -1]
            ][k]));
        } else if (j === ChunkDirections.WEST) {
            // @ts-ignore
            arrayObject.push(addArrayObject(chunk, blockIndex, ...[
                [1, -1, 0, 1, 0, 1, 1, -1, 1],
                [1, -1, 0, 1, 0, -1, 1, -1, -1],
                [1, 1, 0, 1, 0, -1, 1, 1, -1],
                [1, 1, 0, 1, 0, 1, 1, 1, 1]
            ][k]));
        }
    }
}