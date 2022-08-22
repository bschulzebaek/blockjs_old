import StorageAdapter from '../storage/StorageAdapter';
import Repository from '../storage/Repository';
import Inventory from './Inventory';
import generateUUID from '../../utility/generate-uuid';

export default class InventoryRepository extends Repository {
    static STORE_NAME = 'inventory';
    static STORE_IDENTIFIER = 'id';

    constructor(adapter: StorageAdapter) {
        super(adapter, InventoryRepository.STORE_NAME, Inventory);
    }

    public create(): Inventory {
        return super.create(generateUUID()) as Inventory;
    }

    public async readAll(): Promise<Inventory[]> {
        return await super.readAll() as Inventory[];
    }

    public async read(inventoryId: string): Promise<Inventory|undefined> {
        return await super.read(inventoryId);
    }

    public async write(inventory: Inventory) {
        await super.write(inventory);
    }

    public async writeList(inventories: Inventory[]) {
        await super.writeList(inventories);
    }
}