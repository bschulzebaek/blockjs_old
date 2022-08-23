import router from '../../../client/vue-app/router';
import { Views } from '../../../client/vue-app/router/routes';
import Container, { ServiceName } from '../../Container';
import BlockID from '../../data/block-id';

async function useChest(block: any) {
    const { x, y ,z } = block;

    const inventoryId = `${x}:${y}:${z}`;

    await Container.getService(ServiceName.INVENTORY).loadInventory(inventoryId);

    router.push({ name: Views.GAME_CHEST, params: { id: inventoryId }});
}

function useCraftingTable() {
    router.push({ name: Views.GAME_CRAFTING_TABLE });
}

export default function useBlock(block: any) {
    if (block.blockId === BlockID.CHEST) {
        useChest(block);
    } else if (block.blockId === BlockID.CRAFTING_TABLE) {
        useCraftingTable();
    }
}