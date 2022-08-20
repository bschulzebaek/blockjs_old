import Mesh from './Mesh';
import Model from './Model';

const CubeNormals = [
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
];

const CubeUvs = [
    0, 0, 0, 1, 1, 1, 1, 0,
    0, 0, 0, 1, 1, 1, 1, 0,
    0, 0, 0, 1, 1, 1, 1, 0,
    0, 0, 0, 1, 1, 1, 1, 0,
    0, 0, 0, 1, 1, 1, 1, 0,
    0, 0, 0, 1, 1, 1, 1, 0
];

const CubeIndices = [
    0, 1, 2, 0, 2, 3,
    4, 5, 6, 4, 6, 7,
    8, 9, 10, 8, 10, 11,
    12, 13, 14, 12, 14, 15,
    16, 17, 18, 16, 18, 19,
    20, 21, 22, 20, 22, 23
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

    public static create(context: WebGL2RenderingContext, name = 'Cube', w?: number, h?: number, d?: number, x?: number, y?: number, z?: number): Model {
        return new Model(CubeModel.createMesh(context, name, w, h, d, x, y, z));
    }

    public static createMesh(context: WebGL2RenderingContext, name: string, width = 1, height = 1, depth = 1, x = 0, y = 0, z = 0): Mesh {
        const mesh = new Mesh(context, name, CubeIndices, CubeVertices(width, height, depth, x, y, z), CubeNormals, CubeUvs);

        mesh.noCulling = true;

        return mesh;
    }
}