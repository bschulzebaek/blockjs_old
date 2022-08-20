export default interface EntityInterface {
    getId(): string;

    getPosition(): string;
    setPosition(position: string): void;

    getRotation(): any;
    setRotation(rotation: any): void;

    getModel(): any;
    setModel(model: any): void;

    getInventoryId(): string;
    setInventoryId(inventoryId: string): void;
}