import { IDBPDatabase, openDB } from 'idb';

import ChunkRepository from '../../components/chunk/ChunkRepository';
import WorldConfigRepository from '../../components/world-config/WorldConfigRepository';
import EntityRepository from '../../components/entity/EntityRepository';
import InventoryRepository from '../../components/inventory/InventoryRepository';

import StorageAdapter from './StorageAdapter';

const DEFAULT_STORAGE = [{
    name: WorldConfigRepository.STORE_NAME,
    keyPath: WorldConfigRepository.STORE_IDENTIFIER,
}, {
    name: ChunkRepository.STORE_NAME,
    keyPath: ChunkRepository.STORE_IDENTIFIER,
}, {
    name: EntityRepository.STORE_NAME,
    keyPath: EntityRepository.STORE_IDENTIFIER,
}, {
    name: InventoryRepository.STORE_NAME,
    keyPath: InventoryRepository.STORE_IDENTIFIER,
}]

interface StoreConfig {
    name: string;
    keyPath?: string;
}

export default async function createDefaultStorage(id: string): Promise<void> {
    await openDB(id, StorageAdapter.DATABASE_VERSION, {
        upgrade(database: IDBPDatabase) {
            DEFAULT_STORAGE.forEach((config: StoreConfig) => {
                database.createObjectStore(config.name, config);
            });
        }
    });
}