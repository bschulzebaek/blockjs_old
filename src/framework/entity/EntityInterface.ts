import Vector3 from '../../math/Vector3';
export default interface EntityInterface {
    getId(): string;

    getPosition(): Vector3;
    setPosition(position: Vector3): void;

    getRotation(): any;
    setRotation(rotation: any): void;

    getModel(): any;
    setModel(model: any): void;

    getInventoryId(): string;
    setInventoryId(inventoryId: string): void;
}