import EntityInterface from './EntityInterface';
import StoreClass from '../storage/StoreClass';

export interface EntityRawInterface {
    id: string;
    position: string;
    inventoryId: string;
}

export default class Entity extends StoreClass implements EntityInterface {
    static STORAGE_FIELDS  = [
        'id',
        'position',
        'inventoryId',
    ];

    private id: string;
    private position: string;
    private rotation: any;
    private model: any;
    private inventoryId: string;

    constructor(id: string, position: string, inventoryId: string = '') {
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

    public setPosition(position: string) {
        this.position = position;
    }

    public getRotation() {
        return this.rotation;
    }

    public setRotation(rotation) {
        this.rotation = rotation;
    }

    public setModel(model) {
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

    static createFromRaw(entityRaw: EntityRawInterface): Entity {
        return new Entity(entityRaw.id, entityRaw.position, entityRaw.inventoryId);
    }
}