import EntityInterface from './EntityInterface';
import StoreClass from '../storage/StoreClass';
import Vector3 from '../../math/Vector3';
import ModelInterface from '../scene/model/ModelInterface';

export interface EntityRawInterface {
    id: string;
    x: number;
    y: number;
    z: number;
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
    private model?: ModelInterface;
    private inventoryId: string;

    constructor(id: string, position: Vector3, inventoryId: string = '') {
        super(id, Entity.STORAGE_FIELDS);

        this.id = id;
        this.position = position;
        this.inventoryId = inventoryId;
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
        return {
            id: this.id,
            inventoryId: this.inventoryId,
            x: this.position.x,
            y: this.position.y,
            z: this.position.z
        }
    }

    static createFromRaw(entityRaw: EntityRawInterface): Entity {
        const { id, x, y, z, inventoryId } = entityRaw;

        return new Entity(id, new Vector3(x, y, z), inventoryId);
    }
}