import ItemDropModel from './ItemDropModel';
import SceneObjectInterface from '../../threads/scene/scene/SceneObjectInterface';
import BlockID from '../../data/block-id';
import type Entity from '../entity/Entity';
import { distance } from '../../shared/math';
import type Model3D from '../../shared/model/Model3D';
import { ShaderName } from '../../framework/shader/shader-names';
import type World from '../world/World';
import toRawRenderObject from '../../framework/shader/to-raw-render-object';
import generateUUID from '../../shared/utility/generate-uuid';
import SceneContainer from '../../threads/scene/SceneContainer';
import PickupItemEvent from './events/PickupItemEvent';

export default class ItemDrop implements SceneObjectInterface {
    static SHADER_NAME = ShaderName.ITEM_DROP;
    static ROTATE_RATE = 0.5;
    static FALL_RATE = 0.05;

    private id = generateUUID();

    private world: World;
    private player: Entity;
    public model: Model3D;

    private readonly itemId: BlockID;
    private readonly x: number;
    private readonly y: number;
    private readonly z: number;

    constructor(itemId: BlockID, x: number, y: number, z: number) {
        this.itemId = itemId;
        this.x = x + 0.5;
        this.y = y + 0.5;
        this.z = z + 0.5;

        this.player = SceneContainer.getPlayerEntity();
        this.world = SceneContainer.getWorld();
        this.model = this.createModel();
    }

    public getId() {
        return this.id;
    }

    public getShader() {
        return ItemDrop.SHADER_NAME;
    }

    public getRenderData() {
        return toRawRenderObject(this);
    }

    public createModel() {
        const model = ItemDropModel.create(this.itemId);

        model.position.set(this.x, this.y, this.z);

        return model;
    }

    public update(): void {
        const distanceToPlayer = distance(this.model.getPosition(), this.player.getPosition());

        if (distanceToPlayer > 20) {
            return;
        } else if (distanceToPlayer < 1.3) {
            dispatchEvent(new PickupItemEvent(this.id, this.itemId));
        }

        this.updatePosition();
    }

    private updatePosition() {
        this.model.rotation.add(0, ItemDrop.ROTATE_RATE, 0);
        const { x, y, z } = this.model.getPosition();

        if (this.world.getBlockId(x, y - 0.25, z) <= 0) {
            this.model.position.add(0, -ItemDrop.FALL_RATE, 0);
        }

        this.model.update();
    }
}