import CubeModel from '../../../model/cube/CubeModel';
import Mesh from '../../../model/Mesh';
import BlockID from '../../../../data/block-id';
import BlockUV from '../../../../data/block-model';

const CubeNormals = [
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
];

const CubeIndices = [
    0, 1, 2, 0, 2, 3,
    4, 5, 6, 4, 6, 7,
    8, 9, 10, 8, 10, 11,
    12, 13, 14, 12, 14, 15,
    16, 17, 18, 16, 18, 19,
    20, 21, 22, 20, 22, 23
];

function getItemDropVertices(x: number, y: number, z: number): number[] {
    const w = ItemDropModel.WIDTH / 2,
          h = ItemDropModel.HEIGHT / 2,
          d = ItemDropModel.LENGTH / 2,
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

export default class ItemDropModel {

    static WIDTH = 0.3;
    static HEIGHT = 0.3;
    static LENGTH = 0.3;

    // @ts-ignore
    static create() {
        return CubeModel.create('item-drop', ItemDropModel.WIDTH, ItemDropModel.HEIGHT, ItemDropModel.LENGTH);
    }
}