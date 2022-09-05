import BlockID from '../../data/block-id';
import Events from '../../data/events';

export default class ItemDropPickupEvent extends Event {

    private itemId: BlockID;
    private quantity: number;

    constructor(itemId: BlockID, quantity = 1) {
        super(Events.ITEM_DROP_PICKUP);

        this.itemId = itemId;
        this.quantity = quantity;
    }

    public getItemId() {
        return this.itemId;
    }

    public getQuantity() {
        return this.quantity;
    }
}