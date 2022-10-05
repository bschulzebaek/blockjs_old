import type CollisionShape from './CollisionShape';

class CollisionShapeRegistry {
    private registry: Map<string, CollisionShape> = new Map();

    public add(shape: CollisionShape) {
        this.registry.set(shape.getId(), shape);
    }

    public remove(id: string) {
        this.registry.delete(id);
    }

    public get(id: string) {
        if (!this.registry.has(id)) {
            throw new Error(`The CollisionShape with id "${id}" does not exist!`);
        }

        return this.registry.get(id)!;
    }
}

export default new CollisionShapeRegistry()