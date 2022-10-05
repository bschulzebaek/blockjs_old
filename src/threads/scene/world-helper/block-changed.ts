import BlockID from '../../../data/block-id';
import SceneContainer from '../SceneContainer';
import toPositionString from '../../../shared/utility/to-position-string';

function onChestDestroyed(id: string) {
    SceneContainer.getInventoryService().deleteInventory(id);
}

export default function onBlockChanged(oldBlock: BlockID, newBlock: BlockID, x: number, y: number, z: number) {
    const positionString = toPositionString(x, y, z);

    switch (oldBlock) {
        case BlockID.CHEST:
            onChestDestroyed(positionString);
            break;
    }

    switch (newBlock) {

    }
}