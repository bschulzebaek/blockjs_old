
import GameConfigRepository from './GameConfigRepository';
import GameConfig from './GameConfig';
import Service from '../../core/Service';
import StorageAdapter from '../../core/storage/StorageAdapter';

export default class GameConfigService extends Service {

    private repository: GameConfigRepository;
    private config!: GameConfig;

    constructor(adapter: StorageAdapter) {
        super();

        this.repository = new GameConfigRepository(adapter);
    }

    public async create(id: string, name: string, seed: string) {
        this.config = this.repository.create(id, name, seed);

        this.repository.save(this.config);

        return this.config;
    }

    public getConfig() {
        return this.config;
    }

    public async load() {
        this.config = await this.repository.read();

        return this.config;
    }

    public async discard() {
        await this.repository.save(this.config);
    }
}