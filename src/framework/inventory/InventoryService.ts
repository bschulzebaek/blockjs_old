import ServiceInterface from '../ServiceInterface';
import InventoryRepository from './InventoryRepository';
import StorageAdapter from '../storage/StorageAdapter';
import Inventory from './Inventory';
import generateUUID from '../../utility/generate-uuid';
import fillDebugInventory from './fill-debug-inventory';

export default class InventoryService implements ServiceInterface {
    private repository: InventoryRepository;

    private inventories: Map<string, Inventory> = new Map();

    constructor(adapter: StorageAdapter) {
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

        fillDebugInventory(inventory);

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
}