import InventoryRepository from './InventoryRepository';
import Inventory from './Inventory';
import generateUUID from '../../common/utility/generate-uuid';
import Container, { ServiceName } from '../../core/Container';
import Service from '../../core/Service';
import StorageAdapter from '../../core/storage/StorageAdapter';

export default class InventoryService extends Service {
    private repository: InventoryRepository;

    private inventories: Map<string, Inventory> = new Map();

    constructor(adapter: StorageAdapter) {
        super();
        this.repository = new InventoryRepository(adapter);
    }

    public async setup() {

    }

    public getInventory(inventoryId: string) {
        if (!this.inventories.has(inventoryId)) {
            throw new Error(`[InventoryService] Inventory "${inventoryId}" does not exist!`);
        }

        return this.inventories.get(inventoryId);
    }

    public async createInventory(inventoryId = generateUUID()) {
        const inventory = new Inventory(inventoryId);

        await this.repository.write(inventory);

        this.inventories.set(inventory.getId(), inventory);

        return inventory.getId();
    }

    public async loadInventory(inventoryId: string) {
        const inventory = await this.repository.read(inventoryId);

        if (!inventory) {
            await this.createInventory(inventoryId);
        } else {
            this.inventories.set(inventoryId, inventory);
        }

        return inventoryId;
    }

    public async discard() {
        await this.repository.writeList(Array.from(this.inventories.values()));
    }

    public async saveInventory(inventoryId: string) {
        const inventory = this.inventories.get(inventoryId);

        if (!inventory) {
            throw new Error(`[InventoryService] Inventory "${inventoryId}" does not exist!`);
        }

        await this.repository.write(inventory);
    }

    public getPlayerInventory() {
        const playerInventoryId = Container.getService(ServiceName.ENTITY).getPlayer()?.getInventoryId();

        return this.getInventory(playerInventoryId!);
    }

    public async deleteInventory(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}