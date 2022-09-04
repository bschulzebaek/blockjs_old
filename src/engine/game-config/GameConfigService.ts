import GameConfigRepository from './GameConfigRepository';
import GameConfig from './GameConfig';
import StorageAdapter from '../storage/StorageAdapter';
import RawGameConfigInterface from './RawGameConfigInterface';
import generateUUID from '../../shared/utility/generate-uuid';
import generateSeed from '../../shared/utility/generate-seed';

export default class GameConfigService  {
    static DEFAULT_NAME = 'New World';

    private readonly rawConfig: RawGameConfigInterface;
    private storageAdapter: StorageAdapter;
    private repository: GameConfigRepository;
    private config?: GameConfig;

    constructor(rawConfig: RawGameConfigInterface) {
        if (!rawConfig.id || !rawConfig.id.length) {
            rawConfig.id = generateUUID();
        }

        this.rawConfig = rawConfig;

        this.storageAdapter = new StorageAdapter(rawConfig.id)
        this.repository = new GameConfigRepository(this.storageAdapter);
    }

    public async new() {
        let { id, name, seed } = this.rawConfig;

        if (!name || !name.length) {
            name = GameConfigService.DEFAULT_NAME;
        }

        if (!seed || !seed.length) {
            seed = generateSeed();
        }

        this.config = this.repository.create(id!, name, seed);

        await this.repository.save(this.config);
    }

    public async load() {
        this.config = await this.repository.read();
    }

    public async getConfig(): Promise<GameConfig> {
        if (this.rawConfig.isNew) {
            await this.storageAdapter.createDefaultStorage();
            await this.new();
        } else {
            await this.load();
        }

        return this.config!;
    }
}