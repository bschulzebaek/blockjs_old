import StorageAdapter from './StorageAdapter';
import StoreClassConstructorInterface from './StoreClassConstructorInterface';
import StoreClassInterface from './StoreClassInterface';

export default class Repository {

    protected adapter: StorageAdapter;

    private storeName: string;

    private storeClass: StoreClassConstructorInterface;

    constructor(adapter: StorageAdapter, storeName: string, storeClass: StoreClassConstructorInterface) {
        this.adapter = adapter;
        this.storeName = storeName;
        this.storeClass = storeClass;
    }

    public create(...args: unknown[]): StoreClassInterface {
        return new this.storeClass(...args);
    }

    public async read(identifier: string): Promise<any> {
        const raw: any = await this.adapter.read(this.storeName, identifier);

        if (!raw) {
            return undefined;
        }

        return this.storeClass.createFromRaw(raw);
    }

    public async readList(keyMap: Map<string, any>): Promise<void> {
        await this.adapter.readList(this.storeName, keyMap);

        keyMap.forEach((item, key) => {
            if (!item) {
                return;
            }

            keyMap.set(key, this.storeClass.createFromRaw(item))
        });
    }

    public async readAll(): Promise<any> {
        const rawList: any[] = await this.adapter.readAll(this.storeName);

        return rawList.map((raw) => this.storeClass.createFromRaw(raw));
    }

    public async write(obj: StoreClassInterface): Promise<any> {
        await this.adapter.write(this.storeName, null, obj.getRaw());
    }

    public async writeList(objs: StoreClassInterface[], ignoreKey: boolean = true): Promise<any> {
        await this.adapter.writeList(this.storeName, objs, ignoreKey);
    }

    public async delete(identifier: string): Promise<void> {
        await this.adapter.delete(this.storeName, identifier);
    }
}