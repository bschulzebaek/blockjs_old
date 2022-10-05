import InventoryRepository from './InventoryRepository';
import Inventory from './Inventory';
import StorageAdapter from '../../shared/storage/StorageAdapter';
import generateUUID from '../../shared/utility/generate-uuid';
import { PLAYER_INVENTORY_ID } from '../../data/player-data';

export default class InventoryService {
    private repository: InventoryRepository;
    private inventories: Map<string, Inventory> = new Map();

    constructor(adapter: StorageAdapter) {
        this.repository = new InventoryRepository(adapter);
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

    public async getInventory(inventoryId: string) {
        const inventory = this.inventories.get(inventoryId);

        if (!inventory) {
            throw new Error(`[InventoryService] Inventory "${inventoryId}" does not exist!`);
        }

        return inventory;
    }

    public async loadInventory(inventoryId: string) {
        let inventory = await this.repository.read(inventoryId);

        if (!inventory) {
            inventory = new Inventory(inventoryId);
        }

        this.inventories.set(inventoryId, inventory);
        return inventory;
    }

    public async getOrLoadInventory(inventoryId: string) {
        if (!this.inventories.has((inventoryId))) {
            await this.loadInventory(inventoryId);
        }

        return this.getInventory(inventoryId);
    }

    public async loadPlayerInventory() {
        return await this.getOrLoadInventory(PLAYER_INVENTORY_ID);
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
        this.inventories.delete(id);
        await this.repository.delete(id);
    }
}