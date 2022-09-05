import BlockID from '../../data/block-id';
import InventoryInterface from './InventoryInterface';

const FILL_ITEMS: BlockID[] = [
    BlockID.STONE, BlockID.GLASS, BlockID.CHEST, BlockID.BOOKSHELF, BlockID.CRAFTING_TABLE, BlockID.BEDROCK, BlockID.SAND,
    BlockID.GRAVEL, BlockID.GOLD_ORE, BlockID.IRON_ORE, BlockID.COAL_ORE, BlockID.LOG, BlockID.LEAVES, BlockID.SPONGE,
    BlockID.SANDSTONE, BlockID.SAPLING, BlockID.GRASS, BlockID.DIRT, BlockID.COBBLESTONE, BlockID.PLANKS,
];

export default function fillDebugInventory(inventory: InventoryInterface) {
    const slots = new Array(36);

    FILL_ITEMS.forEach((itemId, index) => {
        slots[index] = { itemId, quantity: 32 };
    });

    // @ts-ignore
    inventory.slots = slots;
    // @ts-ignore
    inventory.dispatchUpdate();
}