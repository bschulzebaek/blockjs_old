import { Transform, Vector3 } from '../../common/math';
import ModelInterface from '../../core/scene/model/ModelInterface';


export default interface EntityInterface {
    getId(): string;

    getPosition(): Vector3;
    setPosition(position: Vector3): void;

    getTransform(): Transform;
    setTransform(transform: Transform): void;

    getModel(): any;
    setModel(model: ModelInterface): void;

    getInventoryId(): string;
    setInventoryId(inventoryId: string): void;

    createModel(): void;
    createShader(): void;
}