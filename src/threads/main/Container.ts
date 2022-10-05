import { type Router } from 'vue-router';
import { ApplicationStoreInterface } from '../../user-interface/store';
import InventoryService from '../../components/inventory/InventoryService';
import type WorldConfig from '../../components/world-config/WorldConfig';
import MissingContainerPropertyError from '../../shared/exceptions/MissingContainerPropertyError';
import StateMachine from './StateMachine';
import StorageAdapter from '../../shared/storage/StorageAdapter';

class Container {
    static NAME = 'Main';

    private store?: ApplicationStoreInterface;
    private router?: Router;
    private config?: WorldConfig;
    private inventoryService?: InventoryService;

    public setup(store: ApplicationStoreInterface, router: Router) {
        this.store = store;
        this.router = router;

        StateMachine.setup();
    }

    public reset() {
        delete this.config;
        delete this.inventoryService;
        delete this.store;
        delete this.router;

        StateMachine.reset();
    }

    public getStateMachine() {
        return StateMachine;
    }

    public setConfig(config: WorldConfig) {
        this.config = config;
        this.inventoryService = new InventoryService(new StorageAdapter(config.getId()));
    }

    public getStore() {
        if (!this.store) {
            throw new MissingContainerPropertyError(Container.NAME, 'store');
        }

        return this.store;
    }

    public getRouter() {
        if (!this.router) {
            throw new MissingContainerPropertyError(Container.NAME, 'router');
        }

        return this.router;
    }

    public getConfig() {
        if (!this.config) {
            throw new MissingContainerPropertyError(Container.NAME, 'config');
        }

        return this.config;
    }

    public getInventoryService() {
        if (!this.inventoryService) {
            throw new MissingContainerPropertyError(Container.NAME, 'inventoryService');
        }

        return this.inventoryService;
    }

    public getCanvas() {
        const store = this.getStore();

        if (!store.canvas) {
            throw new MissingContainerPropertyError(Container.NAME, 'store.canvas');
        }

        return store.canvas;
    }
}

export default new Container()