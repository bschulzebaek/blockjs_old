import WorldConfigRepository from './WorldConfigRepository';
import WorldConfig from './WorldConfig';
import RawWorldConfigInterface from './RawWorldConfigInterface';
import StorageAdapter from '../../shared/storage/StorageAdapter';
import generateUUID from '../../shared/utility/generate-uuid';
import generateSeed from '../../shared/utility/generate-seed';
import createDefaultStorage from '../../shared/storage/default-storage';

export default class WorldConfigService {
    static DEFAULT_NAME = 'New World';

    private readonly rawConfig: RawWorldConfigInterface;
    private readonly repository: WorldConfigRepository;
    private config?: WorldConfig;

    constructor(rawConfig: RawWorldConfigInterface) {
        if (!rawConfig.id || !rawConfig.id.length) {
            rawConfig.id = generateUUID();
        }

        this.rawConfig = rawConfig;

        this.repository = new WorldConfigRepository(new StorageAdapter(rawConfig.id));
    }

    public async new() {
        let { id, name, seed } = this.rawConfig;

        if (!name || !name.length) {
            name = WorldConfigService.DEFAULT_NAME;
        }

        if (!seed || !seed.length) {
            seed = generateSeed();
        }

        this.config = this.repository.create(id!, name, seed, true);

        await this.repository.save(this.config);
    }

    public async load() {
        this.config = await this.repository.read();
    }

    public async getConfig(): Promise<WorldConfig> {
        if (this.rawConfig.isNew) {
            await createDefaultStorage(this.rawConfig.id!);
            await this.new();
        } else {
            await this.load();
        }

        return this.config!;
    }
}