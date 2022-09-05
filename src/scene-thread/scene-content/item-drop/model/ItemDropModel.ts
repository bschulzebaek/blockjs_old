import CubeModel from '../../../model/cube/CubeModel';

export default class ItemDropModel {

    static WIDTH = 0.3;
    static HEIGHT = 0.3;
    static LENGTH = 0.3;

    // @ts-ignore
    static create() {
        return CubeModel.create('item-drop', ItemDropModel.WIDTH, ItemDropModel.HEIGHT, ItemDropModel.LENGTH);
    }
}