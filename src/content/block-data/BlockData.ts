import StoreClass from '../../core/storage/StoreClass';
import BlockDataInterface from './BlockDataInterface';

export interface BlockDataRawInterface {
    id: string;
    data: any;
}

export default class BlockData extends StoreClass implements BlockDataInterface {
    static STORAGE_FIELDS = [
        'id',
        'data',
    ];

    private id: string;
    private data: object;

    constructor(id: string, data = {}) {
        super(id, BlockData.STORAGE_FIELDS);

        this.id = id;
        this.data = data;
    }

    public getId() {
        return this.id;
    }

    public getData() {
        return this.data;
    }

    public setData(data = {}) {
        this.data = data;
    }

    public getRaw() {
        return {
            id: this.id,
            data: this.data,
        }
    }

    static createFromRaw(raw: BlockDataRawInterface) {
        return new BlockData(raw.id, raw.data);
    }
}