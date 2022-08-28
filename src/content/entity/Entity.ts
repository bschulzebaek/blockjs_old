import EntityInterface from './EntityInterface';
import Container, { ServiceName } from '../../core/container/Container';
import StoreClass from '../../core/storage/StoreClass';
import ModelInterface from '../../core/scene/model/ModelInterface';
import { Transform, Vector3 } from '../../common/math';
import SceneObjectInterface from '../../core/scene/SceneObjectInterface';

export interface EntityRawInterface {
    id: string;
    position: {
        x: number;
        y: number;
        z: number;
    };
    rotation: {
        x: number;
        y: number;
        z: number;
    };
    inventoryId: string;
}

export default class Entity extends StoreClass implements EntityInterface, SceneObjectInterface {
    static STORAGE_FIELDS = [
        'id',
        'x',
        'y',
        'z',
        'inventoryId',
    ];

    private id: string;
    public transform: Transform = new Transform();
    private model?: ModelInterface;
    private inventoryId: string;

    constructor(id: string, position = new Vector3(), rotation = new Vector3(), inventoryId: string = '') {
        super(id, Entity.STORAGE_FIELDS);

        this.id = id;
        this.inventoryId = inventoryId;
        this.transform.getPosition().set(position.x, position.y, position.z);
        this.transform.getRotation().set(rotation.x, rotation.y, rotation.z);
    }

    public getId() {
        return this.id;
    }

    public getPosition() {
        return this.transform.position;
    }

    public setPosition(position: Vector3) {
        this.transform.position.set(position.x, position.y, position.z);
    }

    public setModel(model: ModelInterface) {
        this.model = model;
    }

    public getModel() {
        return this.model;
    }

    public setInventoryId(inventoryId: string) {
        this.inventoryId = inventoryId;
    }

    public getInventoryId() {
        return this.inventoryId;
    }

    public getRaw() {
        const { position, rotation } = this.transform;

        return {
            id: this.id,
            inventoryId: this.inventoryId,
            position: {
                x: position.x,
                y: position.y,
                z: position.z,
            },
            rotation: {
                x: rotation.x,
                y: rotation.y,
                z: rotation.z,
            }
        }
    }

    public setTransform(transform: Transform) {
        this.transform = transform;
    }

    public getTransform() {
        return this.transform;
    }

    static createFromRaw(entityRaw: EntityRawInterface): Entity {
        const { id, position, rotation, inventoryId } = entityRaw;

        return new Entity(
            id,
            new Vector3(position.x, position.y, position.z),
            new Vector3(rotation.x, rotation.y, rotation.z),
            inventoryId
        );
    }

    public update(delta: number) {

    }

    public createModel() {

    }

    public createShader() {

    }


    public isBlocked() {
        const world = Container.getService(ServiceName.WORLD).getWorld(),
              position = this.getPosition();

        return (
            world.getBlockId(position.x, position.y, position.z) > 0 ||
            world.getBlockId(position.x, position.y + 1,    position.z) > 0
        );
    }
}