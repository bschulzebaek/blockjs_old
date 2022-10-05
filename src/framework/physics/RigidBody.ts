import { Transform, Vector3 } from '../../shared/math';
import CollisionShape from './CollisionShape';

export default class RigidBody {
    static DEFAULT_HEIGHT = 1.7;
    static DEFAULT_WIDTH = 0.6;

    private readonly transform: Transform;
    private readonly collisionShape: CollisionShape;
    private gravity: boolean;
    private collision: boolean;

    private force: Vector3 = new Vector3();

    constructor(transform: Transform, collisionShape: CollisionShape, gravity = true, collision = true) {
        this.transform = transform;
        this.gravity = gravity;
        this.collision = collision;
        this.collisionShape = collisionShape;
    }

    public setGravity(gravity: boolean) {
        this.gravity = gravity;
    }

    public setCollision(collision: boolean) {
        this.collision = collision;
    }

    public update() {
        const { transform, force } = this;

        let xo = force.x,
            yo = force.y,
            zo = force.z;


        if (this.gravity) {
            yo -= 0.012;
        }

        if (this.collision) {
            const collides = this.collisionShape.getCollision(xo, yo, zo);

            if (collides.x) {
                xo = 0;
            }

            if (collides.y) {
                yo = 0;
            }

            if (collides.z) {
                zo = 0;
            }
        }

        transform.position.add(xo, yo, zo);
        force.set(0, this.gravity ? yo : 0, 0);
        transform.updateMatrix();
    }

    public getForce() {
        return this.force;
    }

    public addForce(x: number, y: number, z: number) {
        this.force.add(x, y, z);
    }
}