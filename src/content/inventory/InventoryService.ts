import InventoryRepository from './InventoryRepository';
import Inventory from './Inventory';
import generateUUID from '../../common/utility/generate-uuid';
import Service from '../../core/Service';
import StorageAdapter from '../../core/storage/StorageAdapter';
import fillDebugInventory from './fill-debug-inventory';
import { subscribe } from '../../common/utility/event-helper';
import Events from '../../data/events';
import { BlockPlacedEvent } from '../../core/player/actions/place-block';
import BlockID from '../../data/block-id';
import { BlockDestroyedEvent } from '../../core/player/actions/destroy-block';

export default class InventoryService extends Service {
    static PLAYER_ID = 'player';

    private repository: InventoryRepository;
    private inventories: Map<string, Inventory> = new Map();

    constructor(adapter: StorageAdapter) {
        super();

        this.repository = new InventoryRepository(adapter);
        subscribe(Events.BLOCK_PLACED, this.onBlockPlaced);
        subscribe(Events.BLOCK_DESTROYED, this.onBlockDestroyed);
    }

    public async new() {
        this.createInventory(InventoryService.PLAYER_ID);

        await this.saveInventory(InventoryService.PLAYER_ID);

        fillDebugInventory(await this.getInventory(InventoryService.PLAYER_ID));
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

    public getInventory(inventoryId: string) {
        const inventory = this.inventories.get(inventoryId);

        if (!inventory) {
            throw new Error(`[InventoryService] Inventory "${inventoryId}" does not exist!`);
        }

        return inventory;
    }

    public async loadInventory(inventoryId: string) {
        if (this.inventories.has(inventoryId)) {
            return this.inventories.get(inventoryId);
        }

        const inventory = await this.repository.read(inventoryId);

        if (!inventory) {
            throw new Error(`[InventoryService] Inventory "${inventoryId}" does not exist!`);
        }

        this.inventories.set(inventoryId, inventory);

        return inventory;
    }

    public async saveInventory(inventoryId: string) {
        const inventory = this.inventories.get(inventoryId);

        if (!inventory) {
            throw new Error(`[InventoryService] Inventory "${inventoryId}" does not exist!`);
        }

        await this.repository.write(inventory);
    }

    public getPlayerInventory() {
        return this.getInventory(InventoryService.PLAYER_ID);
    }

    public async deleteInventory(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    private onBlockPlaced = (event: BlockPlacedEvent) => {
        if (event.getBlockId() !== BlockID.CHEST) {
            return;
        }

        const { x, y, z } = event.getPosition();

        this.createInventory(`${x}:${y}:${z}`);
    }

    private onBlockDestroyed = (event: BlockDestroyedEvent) => {
        if (event.getBlockId() !== BlockID.CHEST) {
            return;
        }

        const { x, y, z } = event.getPosition();

        this.deleteInventory(`${x}:${y}:${z}`);
    }
}