import InventorySlotInterface from './InventorySlotInterface';

export default interface InventoryInterface {
    getId(): string;
    getItem(index: number): InventorySlotInterface | null;
    getActiveItem(): InventorySlotInterface | null;
    getActiveIndex(): number;
    setActiveIndex(index: number): void;
    reduceActiveItemQuantity(): void;
    pushItem(item: InventorySlotInterface): void;
    setSlot(index: number, item: InventorySlotInterface | null): void;
    setItemPosition(from: number, to: number): void;
    clearSlot(index: number): void;
}