import StoreClassInterface from './StoreClassInterface';
import MissingImplementationError from '../exceptions/MissingImplementationError';

export default class StoreClass implements StoreClassInterface {
    private readonly storageIdentifier: string;
    private readonly storageSchema: string[];

    constructor(storageIdentifier: string, storageSchema: string[]) {
        this.storageIdentifier = storageIdentifier;
        this.storageSchema = storageSchema;
    }

    public getIdentifier(): string {
        return this.storageIdentifier;
    }

    public getRaw() {
        let raw: { [index: string]: any } = {};

        this.storageSchema.forEach((key) => {
            // @ts-ignore
            raw[key] = this[key];
        });

        return raw;
    }

    // @ts-ignore
    static createFromRaw(raw: any, ...args: any[]): any {
        throw new MissingImplementationError();
    }
}