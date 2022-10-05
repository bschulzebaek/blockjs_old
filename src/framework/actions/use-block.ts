import BlockID from '../../data/block-id';
import { SceneMessages } from '../../shared/messages/ThreadMessages';
import { Views } from '../../data/views';

export default function useBlock(block: any) {
    const { x, y, z, blockId } = block,
          positionStr = `${x}:${y}:${z}`;

    switch (blockId) {
        case BlockID.CHEST:
            postMessage({
                action: SceneMessages.TO_VIEW,
                detail: {
                    name: Views.GAME_CHEST,
                    params: {
                        id: positionStr
                    }
                }
            });
            break;
        case BlockID.CRAFTING_TABLE:
            postMessage({
                action: SceneMessages.TO_VIEW,
                detail: {
                    name: Views.GAME_CRAFTING_TABLE,
                }
            });
            break;
        default:
            throw new Error(`[useBlock] Something went wrong for block ID "${blockId}" at ${positionStr}!`);
    }
}