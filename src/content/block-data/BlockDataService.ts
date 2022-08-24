import Service from '../../core/Service';
import BlockDataRepository from './BlockDataRepository';
import BlockData from './BlockData';
import StorageAdapter from '../../core/storage/StorageAdapter';

export default class BlockDataService extends Service {
    private repository: BlockDataRepository;

    private items: Map<string, BlockData> = new Map();

    constructor(adapter: StorageAdapter) {
        super();

        this.repository = new BlockDataRepository(adapter);
    }

    public async create(id: string, data = {}): Promise<BlockData> {
        const item = this.repository.create(id, data);

        return item;
    }

    public async get(id: string) {
        return await this.repository.read(id);
    }

    public async discard() {
        await this.repository.writeList(Array.from(this.items.values()));
    }
}