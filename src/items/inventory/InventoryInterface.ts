import InventorySlotInterface from './InventorySlotInterface';

export default interface InventoryInterface {
    getId(): string;
    pushItem(item: InventorySlotInterface): void;
}