import Vector3 from '../../math/Vector3';
import ModelInterface from '../scene/model/ModelInterface';
export default interface EntityInterface {
    getId(): string;

    getPosition(): Vector3;
    setPosition(position: Vector3): void;

    getModel(): any;
    setModel(model: ModelInterface): void;

    getInventoryId(): string;
    setInventoryId(inventoryId: string): void;
}