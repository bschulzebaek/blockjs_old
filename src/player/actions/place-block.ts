import Container, { ServiceName } from '../../core/container/Container';
import { ChunkFaces } from '../../data/chunk-faces';
import type PlayerController from '../PlayerController';
import BlockID from '../../data/block-id';
import Events from '../../data/events';
import { publish } from '../../common/utility/event-helper';
import Vector3 from '../../common/math/Vector3';

export class BlockPlacedEvent extends Event {

    private blockId: BlockID;
    private position: Vector3;

    constructor(blockId: BlockID, position: Vector3) {
        super(Events.BLOCK_PLACED);

        this.blockId = blockId;
        this.position = position;
    }

    public getBlockId() {
        return this.blockId;
    }

    public getPosition() {
        return this.position;
    }
}

export default function placeBlock(block: any) {
    const world           = Container.getService(ServiceName.WORLD).getWorld()!,
          player          = Container.getScene().getSceneObject('player-controller') as PlayerController,
          playerInventory = Container.getService(ServiceName.INVENTORY).getPlayerInventory(),
          selectedItem    = playerInventory?.getActiveItem();

    if (!selectedItem || !selectedItem.quantity) {
        return;
    }

    if (!block) {
        return;
    }

    const n = ChunkFaces[block.face].n,
          x = block.x + n[0],
          y = block.y + n[1],
          z = block.z + n[2];

    if (!world.chunkExists(x, z)) {
        return;
    }

    if (player.isBlocking(x, y, z)) {
        return;
    }

    world.setBlockId(x, y, z, selectedItem.itemId);

    publish(new BlockPlacedEvent(selectedItem.itemId, new Vector3(x, y, z)));
}