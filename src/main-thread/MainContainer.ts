import InventoryService from './inventory/InventoryService';
import type GameConfig from './game-config/GameConfig';
import { store } from '../user-interface/store';

class MainContainer {
    private config?: GameConfig;
    private inventoryService?: InventoryService;

    public async create(config: GameConfig) {
        this.config = config;
        this.inventoryService = new InventoryService(config.getId());

        if (config.getIsNew()) {
            await this.inventoryService.new();
        } else {
            await this.inventoryService.loadPlayerInventory();
        }

        store.inventory = await this.inventoryService.getPlayerInventory();
    }

    public discard() {
        delete this.config;
        delete this.inventoryService;
    }

    public getConfig() {
        if (!this.config) {
            throw new Error('[MainContainer] config undefined!');
        }

        return this.config;
    }

    public getInventoryService() {
        if (!this.inventoryService) {
            throw new Error('[MainContainer] inventoryService undefined!');
        }

        return this.inventoryService;
    }
}

export default new MainContainer()