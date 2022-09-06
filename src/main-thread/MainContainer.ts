import { type Router } from 'vue-router';
import router from './user-interface/router';
import { store, ApplicationStoreInterface } from './user-interface/store';
import type InventoryService from './inventory/InventoryService';
import type GameConfig from './game-config/GameConfig';
import MissingContainerPropertyError from '../shared/exceptions/MissingContainerPropertyError';

class MainContainer {
    static NAME = 'Main';

    private readonly store: ApplicationStoreInterface;
    private readonly router: Router;
    private config?: GameConfig;
    private inventoryService?: InventoryService;

    constructor() {
        this.store = store;
        this.router = router;
    }

    public setConfig(config: GameConfig) {
        this.config = config;
    }

    public setInventoryService(inventoryService: InventoryService) {
        this.inventoryService = inventoryService;
    }

    public reset() {
        delete this.config;
        delete this.inventoryService;
        this.store.inventory = null;
    }

    public getStore() {
        return this.store;
    }

    public getRouter() {
        return this.router;
    }

    public getConfig() {
        if (!this.config) {
            throw new MissingContainerPropertyError(MainContainer.NAME, 'config');
        }

        return this.config;
    }

    public getInventoryService() {
        if (!this.inventoryService) {
            throw new MissingContainerPropertyError(MainContainer.NAME, 'inventoryService');
        }

        return this.inventoryService;
    }

    public getCanvas() {
        if (!this.store.canvas) {
            throw new MissingContainerPropertyError(MainContainer.NAME, 'store.canvas');
        }

        return this.store.canvas;
    }
}

export default new MainContainer()