import Repository from '../../core/storage/Repository';
import StorageAdapter from '../../core/storage/StorageAdapter';
import BlockData from './BlockData';

export default class BlockDataRepository extends Repository {
    static STORE_NAME = 'block-data';
    static STORE_IDENTIFIER = 'id';

    constructor(adapter: StorageAdapter) {
        super(adapter, BlockDataRepository.STORE_NAME, BlockData);
    }

    public create(id: string, data = {}): BlockData {
        return super.create(id, data) as BlockData;
    }

    public async read(id: string): Promise<BlockData> {
        return await super.read(id);
    }

    public async write(item: BlockData) {
        await super.write(item);
    }

    public async writeList(items: BlockData[]) {
        await super.writeList(items);
    }
}