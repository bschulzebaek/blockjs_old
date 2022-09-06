import type GameConfig from './game-config/GameConfig';
import MainContainer from './MainContainer';
import InventoryService from './inventory/InventoryService';
import createPlayerEntity from './helper/create-player-entity';

export default class MainThread {
    static async create(config: GameConfig) {
        MainContainer.setConfig(config);
        const inventoryService = new InventoryService(config.getId());
        MainContainer.setInventoryService(inventoryService);

        if (config.getIsNew()) {
            await inventoryService.new();
            await createPlayerEntity(config.getId());
        } else {
            await inventoryService.loadPlayerInventory();
        }

        MainContainer.getStore().inventory = await inventoryService.getPlayerInventory();
    }

    static async discard() {
        MainContainer.reset();
    }
}