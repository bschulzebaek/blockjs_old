import ItemDropModel from './model/ItemDropModel';
import SceneObjectInterface from '../../threads/scene/scene/SceneObjectInterface';
import BlockID from '../../data/block-id';
import type Model3D from '../../shared/model/Model3D';
import type World from '../world/World';
import generateUUID from '../../shared/utility/generate-uuid';
import PickupItemEvent from './events/PickupItemEvent';
import { ShaderName } from '../../framework/shader/shader-names';
import RigidBody from '../../framework/physics/RigidBody';
import CollisionShape from '../../framework/physics/CollisionShape';
import { Transform } from '../../shared/math';
import { PLAYER_ENTITY_ID } from '../../data/player-data';

const OFFSET_BLOCK_CENTER = 0.5;

export default class ItemDrop implements SceneObjectInterface {
    static ROTATE_RATE = 0.5;
    static PICKUP_DISTANCE = 1.2;
    static ANIMATION_DISTANCE = 20;
    static SHADER = ShaderName.ITEM_DROP;

    private readonly id = generateUUID();
    private readonly transform: Transform;
    private readonly model: Model3D;
    private readonly rigidBody: RigidBody;
    private readonly collisionShape: CollisionShape;

    private readonly itemId: BlockID;
    private readonly x: number;
    private readonly y: number;
    private readonly z: number;

    constructor(itemId: BlockID, x: number, y: number, z: number, world: World) {
        this.itemId = itemId;
        this.x = x + OFFSET_BLOCK_CENTER;
        this.y = y + OFFSET_BLOCK_CENTER;
        this.z = z + OFFSET_BLOCK_CENTER;

        this.transform = new Transform();
        this.transform.setPosition(this.x, this.y, this.z);

        this.model = this.createModel();
        this.collisionShape = new CollisionShape(this.id, this.transform, world, 0.3, 0.3, 0.3);
        this.rigidBody = new RigidBody(this.transform, this.collisionShape);
    }

    public getId() {
        return this.id;
    }

    public getRenderData() {
        return this.model.toRawRenderObject();
    }

    public createModel() {
        const model = ItemDropModel.create(this.id, this.itemId);

        model.position.set(this.x, this.y, this.z);

        return model;
    }

    public update(): void {
        const distanceToPlayer = this.collisionShape.distanceTo(PLAYER_ENTITY_ID);

        if (distanceToPlayer > ItemDrop.ANIMATION_DISTANCE) {
            return;
        }

        if (distanceToPlayer < ItemDrop.PICKUP_DISTANCE) {
            dispatchEvent(new PickupItemEvent(this.id, this.itemId));
        }

        this.rigidBody.update();
        const position = this.transform.getPosition();
        this.model.rotation.add(0, ItemDrop.ROTATE_RATE, 0);
        this.model.setPosition(position.x, position.y + 0.18, position.z);
        this.model.update();
    }
}