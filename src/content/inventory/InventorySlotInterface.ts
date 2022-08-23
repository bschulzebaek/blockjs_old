import BlockID from '../../data/block-id';

export default interface InventorySlotInterface {
    itemId: BlockID;
    quantity: number;
    durability?: number;
}