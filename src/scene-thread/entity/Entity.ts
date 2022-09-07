import { Transform, Vector3 } from '../../shared/math';
import ModelInterface from '../model/ModelInterface';
import WorldInterface from '../../world-thread/WorldInterface';
import StoreClass from '../../shared/storage/StoreClass';

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
}

export default class Entity extends StoreClass {
    static STORAGE_FIELDS = [
        'id',
        'x',
        'y',
        'z',
        'inventoryId',
    ];

    public id: string;
    public transform: Transform = new Transform();
    public model?: ModelInterface;

    private world?: WorldInterface;

    constructor(id: string, position = new Vector3(), rotation = new Vector3()) {
        super(id, Entity.STORAGE_FIELDS);

        this.id = id;
        this.transform.getPosition().set(position.x, position.y, position.z);
        this.transform.getRotation().set(rotation.x, rotation.y, rotation.z);
    }

    public setWorld(world: WorldInterface) {
        this.world = world;
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

    public setTransform(transform: Transform) {
        this.transform = transform;
    }

    public getTransform() {
        return this.transform;
    }

    // @ts-ignore
    public update(delta: number) {

    }

    public createModel() {

    }

    public createShader() {

    }

    private getWorld() {
        if (!this.world) {
            throw new Error('[Entity] world undefined!');
        }

        return this.world;
    }

    public isBlocked() {
        const world = this.getWorld(),
            position = this.getPosition();

        return (
            world.getBlockId(position.x, position.y, position.z) > 0 ||
            world.getBlockId(position.x, position.y + 1, position.z) > 0
        );
    }

    public canFall() {
        const world = this.getWorld(),
            position = this.getPosition();

        return (world.getBlockId(position.x, position.y - 1, position.z) <= 0);
    }

    public getRaw() {
        const { position, rotation } = this.transform;

        return {
            id: this.id,
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

    static createFromRaw(entityRaw: EntityRawInterface): Entity {
        const { id, position, rotation } = entityRaw;

        return new Entity(
            id,
            new Vector3(position.x, position.y, position.z),
            new Vector3(rotation.x, rotation.y, rotation.z),
        );
    }
}