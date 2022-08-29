import Container from '../../framework/container/Container';
import Model from '../../framework/scene/model/Model';
import SceneObjectInterface from '../../framework/scene/SceneObjectInterface';
import BlockID from '../../data/block-id';
import ItemDropModel from './ItemDropModel';
import generateUUID from '../../common/utility/generate-uuid';
import ShaderInterface from '../../framework/renderer/ShaderInterface';

export default class ItemDrop implements SceneObjectInterface {

    static ROTATE_RATE= 0.02;

    private id = generateUUID();

    private model: Model;
    private shader!: ShaderInterface;

    private itemId: BlockID;
    private x: number;
    private y: number;
    private z: number;

    constructor(itemId: BlockID, x: number, y: number, z: number) {
        this.itemId = itemId;
        this.x = x + 0.5;
        this.y = y + 0.5;
        this.z = z + 0.5;

        this.shader = Container.getShader('item-drop');
        this.model = this.createModel();

        console.log(this)
    }

    public getId(): string {
        return this.id;
    }

    public createModel() {
        const model = ItemDropModel.create(this.itemId, this.x, this.y, this.z);

        model.position.set(this.x, this.y, this.z);

        return model;
    }

    public createShaderReference(): void {
        this.shader = Container.getShader('item-drop');
    }

    public update(): void {
        this.updatePosition();
        this.shader.run(this.model);
    }

    private updatePosition() {
        // ToDo: Rotation
        // ToDo: Check if position is blocked or can fall
        // this.model.rotation.add(0, ItemDrop.ROTATE_RATE, 0);

        this.model.update();
    }

    public getModel() {
        return this.model;
    }
}