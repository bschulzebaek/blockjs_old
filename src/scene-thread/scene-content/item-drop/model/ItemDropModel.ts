import BlockUV from '../../../../data/block-model';
import BlockID from '../../../../data/block-id';
import Model from '../../../model/Model';
import RawMesh from '../../../model/RawMesh';

const CubeNormals = [
    // 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    // 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    // -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
    // 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    // 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
    // 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,

    0, 0, 0,

    1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0,
    0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0,
    0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
    0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1,
    0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1,
];

const CubeIndices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left
];

const CubeVertices = (): number[] => {
    const w = ItemDropModel.WIDTH / 2,
        h = ItemDropModel.HEIGHT / 2,
        d = ItemDropModel.LENGTH / 2,
        x0 = -w,
        x1 =  w,
        y0 = -h,
        y1 =  h,
        z0 = -d,
        z1 =  d;

    return [
        x0, y1, z1, x0, y0, z1, x1, y0, z1, x1, y1, z1,
        x1, y1, z0, x1, y0, z0, x0, y0, z0, x0, y1, z0,
        x0, y1, z0, x0, y0, z0, x0, y0, z1, x0, y1, z1,
        x1, y1, z1, x1, y0, z1, x1, y0, z0, x1, y1, z0,
        x0, y1, z0, x0, y1, z1, x1, y1, z1, x1, y1, z0,
        x0, y0, z1, x0, y0, z0, x1, y0, z0, x1, y0, z1,
    ];
}

export default class ItemDropModel {
    static WIDTH = 0.3;
    static HEIGHT = 0.3;
    static LENGTH = 0.3;

    static create(itemId: BlockID) {
        const uvs: number[] = [];

        const blockUv = BlockUV[itemId];

        for (let i = 0; i < 6; i++) {
            uvs.push(...blockUv);
        }

        return new Model(ItemDropModel.createMesh('item-drop', uvs));
    }

    public static createMesh(name: string, uvs: number[]) {
        return new RawMesh(name, CubeIndices, CubeVertices(), CubeNormals, uvs);
    }
}