import { Transform, Vector3 } from '../../shared/math';
import Model3DInterface from '../../shared/model/Model3DInterface';

export default interface EntityInterface {
    getId(): string;

    getPosition(): Vector3;
    setPosition(position: Vector3): void;

    getTransform(): Transform;
    setTransform(transform: Transform): void;

    getModel(): any;
    setModel(model: Model3DInterface): void;

    getInventoryId(): string;
    setInventoryId(inventoryId: string): void;
}