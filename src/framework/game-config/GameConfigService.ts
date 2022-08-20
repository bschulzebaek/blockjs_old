import ServiceInterface from '../ServiceInterface';
import StorageAdapter from '../storage/StorageAdapter';
import GameConfigRepository from './GameConfigRepository';
import GameConfig from './GameConfig';

export default class GameConfigService implements ServiceInterface {

    private repository: GameConfigRepository;
    private config!: GameConfig;

    constructor(adapter: StorageAdapter) {
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