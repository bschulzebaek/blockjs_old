import BlockID from '../../../data/block-id';

export default class PickupItemEvent extends Event {
    static NAME = 'item-drop/pickup';

    private readonly entityId: string;
    private readonly itemId: BlockID;

    constructor(entityId: string, itemId: BlockID) {
        super(PickupItemEvent.NAME);

        this.entityId = entityId;
        this.itemId = itemId;
    }

    public getEntityId() {
        return this.entityId;
    }

    public getItemId() {
        return this.itemId;
    }
}