import { Transform, Vector3 } from '../../../shared/math';
import ModelInterface from '../model/ModelInterface';
import type SceneWorld from '../SceneWorld';

export default class Entity {
    public id: string;
    public transform: Transform = new Transform();
    public model?: ModelInterface;

    private readonly world: SceneWorld;

    constructor(id: string, world: SceneWorld, position = new Vector3(), rotation = new Vector3()) {
        this.id = id;
        this.world = world;
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


    public isBlocked() {
        const world = this.world,
              position = this.getPosition();

        console.log(world.getBlockId(position.x, position.y, position.z))
        console.log(world.getBlockId(position.x, position.y + 1, position.z))

        return (
            world.getBlockId(position.x, position.y, position.z) > 0 ||
            world.getBlockId(position.x, position.y + 1,    position.z) > 0
        );
    }
}