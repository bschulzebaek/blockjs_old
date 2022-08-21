import EntityInterface from './EntityInterface';
import StoreClass from '../storage/StoreClass';
import Vector3 from '../../math/Vector3';
import ModelInterface from '../scene/model/ModelInterface';
import { Transform } from '../../math';

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

export default class Entity extends StoreClass implements EntityInterface {
    static STORAGE_FIELDS  = [
        'id',
        'x',
        'y',
        'z',
        'inventoryId',
    ];

    private id: string;
    private position: Vector3;
    public transform: Transform = new Transform();
    private model?: ModelInterface;
    private inventoryId: string;

    constructor(id: string, position = new Vector3(), rotation = new Vector3(), inventoryId: string = '') {
        super(id, Entity.STORAGE_FIELDS);

        this.id = id;
        this.position = position;
        this.inventoryId = inventoryId;
        this.transform.rotation = rotation;
    }

    public getId() {
        return this.id;
    }

    public getPosition() {
        return this.position;
    }

    public setPosition(position: Vector3) {
        this.position = position;
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
        const position = this.position,
              rotation = this.transform.rotation;

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
                y: 0,
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
}