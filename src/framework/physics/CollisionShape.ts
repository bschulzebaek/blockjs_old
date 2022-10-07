import { distance, Transform } from '../../shared/math';
import type World from '../../components/world/World';
import CollisionShapeRegistry from './CollisionShapeRegistry';
import BlockID from '../../data/block-id';

// ToDo: class CubeCollisionShape implements CollisionShapeInterface
export default class CollisionShape {
    private readonly sceneId: string;
    private readonly transform: Transform;
    private readonly world: World;
    private readonly width: number;
    private readonly depth: number;
    private readonly height: number;

    constructor(sceneId: string, transform: Transform, world: World, width: number, depth: number, height: number) {
        this.sceneId = sceneId;
        this.transform = transform;
        this.world = world;
        this.width = width;
        this.depth = depth;
        this.height = height;

        CollisionShapeRegistry.add(this);
    }

    public getId() {
        return this.sceneId;
    }

    public getCollision(offsetX: number, offsetY: number, offsetZ: number) {
        return this.getWorldCollision(offsetX, offsetY, offsetZ);
    }

    public getPosition() {
        return this.transform.getPosition();
    }

    // @ts-ignore
    private getShapeIntersections() {
        return false;
    }

    // ToDo ? Cache results per Chunk, invalidate on SetBlockEvent
    private getWorldCollision(offsetX: number, offsetY: number, offsetZ: number) {
        const { world } = this;

        let collision = {
            x: false,
            y: false,
            z: false,
        };

        this.getCornerPoints().forEach(({ x, y, z, top }) => {
            if (offsetX !== 0 && world.getBlockId(x + offsetX, y, z) !== BlockID.AIR) {
                collision.x = true;
            }

            if (offsetY !== 0 && world.getBlockId(x + offsetX, y + offsetY, z + offsetZ) !== BlockID.AIR) {
                if (top || offsetY <= 0) {
                    collision.y = true;
                }
            }

            if (offsetZ !== 0 && world.getBlockId(x, y, z + offsetZ) !== BlockID.AIR) {
                collision.z = true;
            }
        });

        return collision;
    }

    private getCornerPoints() {
        const { x, y, z } = this.transform.getPosition(),
            { width, depth, height } = this;

        const x0 = x - width / 2,
            x1 = x + width / 2,
            y0 = y,
            y1 = y + height,
            z0 = z - depth / 2,
            z1 = z + depth / 2;

        return [
            { x: x0, y, z: z0 },
            { x: x1, y, z: z0 },
            { x: x0, y, z: z1 },
            { x: x1, y, z: z1 },
            { x: x0, y: y0, z: z0 },
            { x: x1, y: y0, z: z0 },
            { x: x0, y: y0, z: z1 },
            { x: x1, y: y0, z: z1 },
            { x: x0, y: y1, z: z0, top: true },
            { x: x1, y: y1, z: z0, top: true },
            { x: x0, y: y1, z: z1, top: true },
            { x: x1, y: y1, z: z1, top: true }
        ];
    }

    public isBlocking(worldX: number, worldY: number, worldZ: number): boolean {
        return this.getCornerPoints().some(({ x, y, z }) => {
            return Math.floor(x) === worldX && Math.floor(y) === worldY && Math.floor(z) === worldZ;
        });
    }

    // ToDo: Implement proper intersection checks for Non-World Collision
    public distanceTo(id: string) {
        return distance(this.transform.getPosition(), CollisionShapeRegistry.get(id).getPosition());
    }
}