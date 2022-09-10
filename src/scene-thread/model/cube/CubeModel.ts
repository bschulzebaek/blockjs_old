import Model from '../Model';
import RawMesh from '../RawMesh';

const CubeNormals = [
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
];

const CubeIndices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left
];

const CubeVertices = (width: number, height: number, depth: number, x: number, y: number, z: number): number[] => {
    const w = width / 2,
          h = height / 2,
          d = depth / 2,
          x0 = x - w,
          x1 = x + w,
          y0 = y - h,
          y1 = y + h,
          z0 = z - d,
          z1 = z + d;

    return [
        x0, y1, z1, x0, y0, z1, x1, y0, z1, x1, y1, z1,
        x1, y1, z0, x1, y0, z0, x0, y0, z0, x0, y1, z0,
        x0, y1, z0, x0, y0, z0, x0, y0, z1, x0, y1, z1,
        x1, y1, z1, x1, y0, z1, x1, y0, z0, x1, y1, z0,
        x0, y1, z0, x0, y1, z1, x1, y1, z1, x1, y1, z0,
        x0, y0, z1, x0, y0, z0, x1, y0, z0, x1, y0, z1
    ];
}

export default class CubeModel {

    public static create(name = 'Cube', w?: number, h?: number, d?: number, x?: number, y?: number, z?: number): Model {
        return new Model(CubeModel.createMesh(name, w, h, d, x, y, z));
    }

    public static createMesh(name: string, width = 1, height = 1, depth = 1, x = 0, y = 0, z = 0) {
        return new RawMesh(name, CubeIndices, CubeVertices(width, height, depth, x, y, z), CubeNormals);
    }
}