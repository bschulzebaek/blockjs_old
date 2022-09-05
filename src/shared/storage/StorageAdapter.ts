import { openDB } from 'idb';
import StoreClassInterface from './StoreClassInterface';

enum TransactionMode {
    READ = 'readonly',
    WRITE = 'readwrite'
}

export default class StorageAdapter {

    static DATABASE_VERSION = 1;

    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    public getName() {
        return this.name;
    }

    public async read(storeName: string, key: string): Promise<any> {
        const db = await openDB(this.name, StorageAdapter.DATABASE_VERSION);
        let tx = db.transaction(storeName, TransactionMode.READ);
        let store = tx.objectStore(storeName);

        const result = await store.get(key);
        await tx.done;

        return result;
    }

    public async readAll(storeName: string): Promise<any[]> {
        const db = await openDB(this.name, StorageAdapter.DATABASE_VERSION);
        let tx = db.transaction(storeName, TransactionMode.READ);
        let store = tx.objectStore(storeName);

        const result = await store.getAll();
        await tx.done;

        return result;
    }

    public async readList(storeName: string, objMap: Map<string, undefined>): Promise<void> {
        const db = await openDB(this.name, StorageAdapter.DATABASE_VERSION);
        let tx = db.transaction(storeName, TransactionMode.READ);
        let store = tx.objectStore(storeName);

        const keys = Array.from(objMap.keys());

        await Promise.all([
            ...keys.map(async (key) => {
                objMap.set(key, await store.get(key));
            }),
            tx.done,
        ]);
    }

    public async write(storeName: string, value: StoreClassInterface): Promise<void> {
        const db = await openDB(this.name, StorageAdapter.DATABASE_VERSION);
        let tx = db.transaction(storeName, TransactionMode.WRITE);
        let store = tx.objectStore(storeName);

        await Promise.all([
            store.put(value.getRaw()),
            tx.done,
        ]);
    }

    public async writeList(storeName: string, objs: StoreClassInterface[]): Promise<void> {
        const db = await openDB(this.name, StorageAdapter.DATABASE_VERSION);
        let tx = db.transaction(storeName, TransactionMode.WRITE);
        let store = tx.objectStore(storeName);

        await Promise.all([
            ...objs.map((obj) => store.put(obj.getRaw())),
            tx.done,
        ]);
    }

    public async delete(storeName: string, key: string): Promise<void> {
        const db = await openDB(this.name, StorageAdapter.DATABASE_VERSION);
        let tx = db.transaction(storeName, TransactionMode.WRITE);
        let store = tx.objectStore(storeName);

        await Promise.all([
            store.delete(key),
            tx.done,
        ]);
    }
}