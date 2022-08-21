import DEFAULT_STORAGE from './default-storage';
import StoreClassInterface from './StoreClassInterface';

enum TransactionMode {
    READ = 'readonly',
    WRITE = 'readwrite'
}

interface StoreConfig {
    name: string;
    keyPath?: string;
}

export default class StorageAdapter {

    static DATABASE_VERSION = 1;

    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public getName() {
        return this.name;
    }

    public async createDefaultStorage(): Promise<void> {
        return new Promise((resolve) => {
            const request = this.getDatabase();

            request.onupgradeneeded = (event: any) => {
                const db = event.target.result as IDBDatabase;

                DEFAULT_STORAGE.forEach((config: StoreConfig) => {
                    db.createObjectStore(config.name, config);
                });

                resolve();
            };
        });
    }

    private getDatabase() {
        return window.indexedDB.open(this.name, StorageAdapter.DATABASE_VERSION);
    }

    private getConnection(): Promise<IDBDatabase> {
        return new Promise((resolve) => {
            const request = window.indexedDB.open(this.name, StorageAdapter.DATABASE_VERSION);

            request.onsuccess = (event: any) => {
                resolve(event.target.result as IDBDatabase);
            }
        });
    }

    public read(storeName: string, key: string): Promise<any> {
        return new Promise(async (resolve) => {

            const transaction = (await this.getConnection()).transaction([ storeName ], TransactionMode.READ);

            const query = transaction.objectStore(storeName).get(key)

            query.onsuccess = () => {
                resolve(query.result);
            };
        });
    }

    public readAll(storeName: string): Promise<any[]> {
        return new Promise(async (resolve) => {
            const transaction = (await this.getConnection()).transaction([ storeName ], TransactionMode.READ);

            const query = transaction.objectStore(storeName).getAll();

            query.onsuccess = () => {
                resolve(query.result);
            };
        });
    }

    public async write(storeName: string, key: string|null, value: any): Promise<void> {
        const transaction = (await this.getConnection()).transaction(storeName, TransactionMode.WRITE);

        const store = transaction.objectStore(storeName);

        if (key) {
            store.add(value, key);
        } else {
            store.add(value);
        }
    }

    public async writeList(storeName: string, objs: StoreClassInterface[], ignoreKey: boolean): Promise<void> {
        const transaction = (await this.getConnection()).transaction(storeName, TransactionMode.WRITE);
        const store = transaction.objectStore(storeName);

        await Promise.all(objs.map((obj) => {
            if (ignoreKey) {
                return store.put(obj.getRaw());
            } else {
                return store.put(obj.getRaw(), obj.getIdentifier());
            }
        }));
    }
}