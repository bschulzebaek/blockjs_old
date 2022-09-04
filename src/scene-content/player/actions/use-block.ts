import BlockID from '../../../data/block-id';

export default function useBlock(block: any) {
    const { x, y, z, blockId } = block,
          positionStr = `${x}:${y}:${z}`;

    switch (blockId) {
        case BlockID.CHEST:
            console.log('Use Chest')
            // StateMachine.to_GameChest(positionStr);

            break;
        case BlockID.CRAFTING_TABLE:
            console.log('Use CraftingTable')
            // StateMachine.to_GameCraftingTable();

            break;
        default:
            throw new Error(`[useBlock] Something went wrong for block ID "${blockId}" at ${positionStr}!`);
    }
}