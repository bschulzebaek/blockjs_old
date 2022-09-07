import SceneObjectInterface from '../../SceneObjectInterface';
import generateUUID from '../../../shared/utility/generate-uuid';
import Model from '../../model/Model';
import type SceneWorld from '../../world-helper/SceneWorld';
import BlockID from '../../../data/block-id';
import SceneContainer from '../../SceneContainer';
import ItemDropModel from './model/ItemDropModel';
import type Entity from '../../entity/Entity';
import { distance } from '../../../shared/math';
import { RenderMessages, SceneMessages } from '../../../shared/messages/ThreadMessages';
import Message from '../../../shared/utility/Message';
import { ShaderName } from '../../../render-thread/shader/ShaderRegistry';

export default class ItemDrop implements SceneObjectInterface {
    static SHADER_NAME = ShaderName.ITEM_DROP;
    static ROTATE_RATE = 0.5;
    static FALL_RATE = 0.05;

    private id = generateUUID();

    private world: SceneWorld;
    private player: Entity;
    public model: Model;

    // @ts-ignore
    private readonly itemId: BlockID;
    private readonly x: number;
    private readonly y: number;
    private readonly z: number;

    constructor(itemId: BlockID, x: number, y: number, z: number) {
        this.itemId = itemId;
        this.x = x + 0.5;
        this.y = y + 0.5;
        this.z = z + 0.5;

        // @ts-ignore
        this.player =  SceneContainer.getScene().getSceneObject('player-controller').entity as unknown as Entity;
        this.world = SceneContainer.getWorld();
        this.model = this.createModel();

        SceneContainer.getScene().addSceneObject(this);
    }

    public getId() {
        return this.id;
    }

    public getShader() {
        return ItemDrop.SHADER_NAME;
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
        } else if (distanceToPlayer < 1.0) {
            this.triggerPickup();
        }

        this.updatePosition();
    }

    public discard() {
        Message.send(
            RenderMessages.DELETE_SCENE_OBJECTS,
            [ this.id ],
            SceneContainer.getRenderPort(),
        );
    }

    private updatePosition() {
        this.model.rotation.add(0, ItemDrop.ROTATE_RATE, 0);
        const { x, y, z } = this.model.getPosition();

        if (this.world.getBlockId(x, y - 0.25, z) <= 0) {
            this.model.position.add(0, -ItemDrop.FALL_RATE, 0);
        }

        this.model.update();
    }


    private triggerPickup() {
        SceneContainer.getScene().deleteSceneObject(this.id);

        postMessage({ action: SceneMessages.PICKUP_ITEM, detail: { itemId: this.itemId }});
    }
}