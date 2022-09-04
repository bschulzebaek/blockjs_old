import Container, { ServiceName } from '../../framework/container/Container';
import Model from '../../framework/scene/model/Model';
import SceneObjectInterface from '../../framework/scene/SceneObjectInterface';
import BlockID from '../../data/block-id';
import ItemDropModel from './model/ItemDropModel';
import generateUUID from '../../common/utility/generate-uuid';
import ShaderInterface from '../../framework/renderer/ShaderInterface';
import { distance } from '../../common/math';
import EntityInterface from '../../framework/entity/EntityInterface';
import { publish } from '../../common/utility/event-helper';
import ItemDropPickupEvent from './ItemDropPickupEvent';
import WorldInterface from '../../../world/WorldInterface';

export default class ItemDrop implements SceneObjectInterface {

    static ROTATE_RATE = 0.5;
    static FALL_RATE = 0.05;

    private id = generateUUID();

    private model: Model;
    private shader!: ShaderInterface;
    private player: EntityInterface;
    private world: WorldInterface;

    private itemId: BlockID;
    private x: number;
    private y: number;
    private z: number;

    constructor(itemId: BlockID, x: number, y: number, z: number) {
        this.itemId = itemId;
        this.x = x + 0.5;
        this.y = y + 0.5;
        this.z = z + 0.5;

        this.player = Container.getService(ServiceName.ENTITY).getPlayer()!;
        this.world = Container.getScene()?.getSceneObject('world') as unknown as WorldInterface;
        this.model = this.createModel();
        this.createShaderReference();
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
        const distanceToPlayer = distance(this.model.getPosition(), this.player.getPosition());

        if (distanceToPlayer > 20) {
            return;
        } else if (distanceToPlayer < 1.0) {
            this.triggerPickup();
        }

        this.updatePosition();
        this.shader.run(this.model);
    }

    private updatePosition() {
        this.model.rotation.add(0, ItemDrop.ROTATE_RATE, 0);
        const { x, y, z } = this.model.getPosition();

        if (this.world.getBlockId(x, y - 0.25, z) <= 0) {
            this.model.position.add(0, -ItemDrop.FALL_RATE, 0);
        }

        this.model.update();
    }

    public getModel() {
        return this.model;
    }

    private triggerPickup() {
        Container.getScene()?.deleteSceneObject(this.id);

        publish(new ItemDropPickupEvent(this.itemId));
    }
}