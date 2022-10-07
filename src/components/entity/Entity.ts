import { Transform, Vector3 } from '../../shared/math';
import Model3DInterface from '../../shared/model/Model3DInterface';
import WorldInterface from '../../components/world/WorldInterface';
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
    data: any;
}

export default class Entity extends StoreClass {
    static STORAGE_FIELDS = [
        'id',
        'x',
        'y',
        'z',
        'inventoryId',
        'data',
    ];

    public id: string;
    public transform: Transform = new Transform();
    public model?: Model3DInterface;

    private world?: WorldInterface;
    private data?: any;

    constructor(id: string, position = new Vector3(), rotation = new Vector3(), data: any = {}) {
        super(id, Entity.STORAGE_FIELDS);

        this.id = id;
        this.transform.getPosition().set(position.x, position.y, position.z);
        this.transform.getRotation().set(rotation.x, rotation.y, rotation.z);
        this.data = data;
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

    public setModel(model: Model3DInterface) {
        this.model = model;
    }

    public getModel() {
        return this.model;
    }

    public setTransform(transform: Transform) {
        this.transform = transform;
    }

    public getData() {
        return this.data;
    }

    public setData(data: any) {
        this.data = data;
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

        const x = Math.round(position.x),
            y = Math.round(position.y),
            z = Math.round(position.z);

        return (
            world.getBlockId(x, y, z) > 0 ||
            world.getBlockId(x, y, z) > 0
        );
    }

    public canFall() {
        const world = this.getWorld(),
            position = this.getPosition();

        const x = Math.round(position.x),
            y = Math.round(position.y),
            z = Math.round(position.z);

        return (world.getBlockId(x, y - 1, z) <= 0);
    }

    public getRaw() {
        const { id, data } = this;
        const { position, rotation } = this.transform;

        return {
            id,
            position: {
                x: position.x,
                y: position.y,
                z: position.z,
            },
            rotation: {
                x: rotation.x,
                y: rotation.y,
                z: rotation.z,
            },
            data,
        }
    }

    static createFromRaw(entityRaw: EntityRawInterface): Entity {
        const { id, position, rotation, data } = entityRaw;

        return new Entity(
            id,
            new Vector3(position.x, position.y, position.z),
            new Vector3(rotation.x, rotation.y, rotation.z),
            data,
        );
    }
}