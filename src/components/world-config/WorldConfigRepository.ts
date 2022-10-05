import Repository from '../../shared/storage/Repository';
import StorageAdapter from '../../shared/storage/StorageAdapter';
import WorldConfig from './WorldConfig';

export default class WorldConfigRepository extends Repository {
    static STORE_NAME = 'config';
    static STORE_IDENTIFIER = 'id';

    constructor(adapter: StorageAdapter) {
        super(adapter, WorldConfigRepository.STORE_NAME, WorldConfig);
    }

    public create(id: string, name: string, seed: string, isNew: boolean): WorldConfig {
        return super.create(id, name, seed, isNew) as WorldConfig;
    }

    public async read(): Promise<WorldConfig> {
        return await super.read(this.adapter.getName());
    }

    public async save(config: WorldConfig) {
        await super.write(config);
    }
}