import { IDBPDatabase, openDB } from 'idb';

import ChunkRepository from '../../scene-thread/world/chunk/ChunkRepository';
import GameConfigRepository from '../../main-thread/game-config/GameConfigRepository';
import EntityRepository from '../../scene-thread/entity/EntityRepository';
import InventoryRepository from '../../main-thread/inventory/InventoryRepository';

import StorageAdapter from './StorageAdapter';

const DEFAULT_STORAGE = [{
    name: GameConfigRepository.STORE_NAME,
    keyPath: GameConfigRepository.STORE_IDENTIFIER,
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