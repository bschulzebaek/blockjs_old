import InventoryRepository from './InventoryRepository';
import Inventory from './Inventory';
import generateUUID from '../../shared/utility/generate-uuid';
import StorageAdapter from '../../shared/storage/StorageAdapter';
import fillDebugInventory from './fill-debug-inventory';
import { PLAYER_INVENTORY_ID } from '../../data/player-data';

export default class InventoryService {
    private repository: InventoryRepository;
    private inventories: Map<string, Inventory> = new Map();

    constructor(id: string) {
        this.repository = new InventoryRepository(new StorageAdapter(id));
    }

    public async new() {
        this.createInventory(PLAYER_INVENTORY_ID);

        await this.saveInventory(PLAYER_INVENTORY_ID);

        fillDebugInventory(await this.inventories.get(PLAYER_INVENTORY_ID)!);
    }

    public async load() {
        const inventories = await this.repository.readAll();

        inventories.forEach((inventory) => {
            this.inventories.set(inventory.getId(), inventory);
        });
    }

    public async discard() {
        await this.repository.writeList(Array.from(this.inventories.values()));
    }

    public createInventory(inventoryId = generateUUID()) {
        const inventory = new Inventory(inventoryId);

        this.inventories.set(inventory.getId(), inventory);

        return inventory.getId();
    }

    public async loadInventory(inventoryId: string) {
        if (this.inventories.has(inventoryId)) {
            return this.inventories.get(inventoryId);
        }

        this.createInventory(inventoryId);

        const inventory = await this.repository.read(inventoryId);

        if (inventory) {
            this.inventories.set(inventoryId, inventory);
        }

        return this.inventories.get(inventoryId);
    }

    public async loadPlayerInventory() {
        await this.loadInventory(PLAYER_INVENTORY_ID);
    }

    public async saveInventory(inventoryId: string) {
        const inventory = this.inventories.get(inventoryId);

        if (!inventory) {
            throw new Error(`[InventoryService] Inventory "${inventoryId}" does not exist!`);
        }

        await this.repository.write(inventory);
    }

    public getPlayerInventory() {
        if (!this.inventories.has(PLAYER_INVENTORY_ID)) {
            throw new Error(`[InventoryService] Inventory "${PLAYER_INVENTORY_ID}" does not exist!`);
        }

        return this.inventories.get(PLAYER_INVENTORY_ID)!;
    }

    public async deleteInventory(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}