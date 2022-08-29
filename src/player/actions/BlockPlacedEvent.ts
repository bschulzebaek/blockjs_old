import BlockID from '../../data/block-id';
import Vector3 from '../../common/math/Vector3';
import Events from '../../data/events';
import InventoryInterface from '../../items/inventory/InventoryInterface';

export default class BlockPlacedEvent extends Event {

    private blockId: BlockID;
    private position: Vector3;
    private inventory: InventoryInterface;

    constructor(blockId: BlockID, position: Vector3, inventory: InventoryInterface) {
        super(Events.BLOCK_PLACED);

        this.blockId = blockId;
        this.position = position;
        this.inventory = inventory;
    }

    public getBlockId() {
        return this.blockId;
    }

    public getPosition() {
        return this.position;
    }

    public getInventory() {
        return this.inventory;
    }
}