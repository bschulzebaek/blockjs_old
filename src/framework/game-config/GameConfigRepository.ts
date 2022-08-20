import GameConfig from './GameConfig';
import StorageAdapter from '../storage/StorageAdapter';
import Repository from '../storage/Repository';

export default class GameConfigRepository extends Repository {
    static STORE_NAME = 'config';
    static STORE_IDENTIFIER = 'id';

    constructor(adapter: StorageAdapter) {
        super(adapter, GameConfigRepository.STORE_NAME, GameConfig);
    }

    public create(id: string, name: string, seed: string): GameConfig {
        return super.create(id, name, seed) as GameConfig;
    }

    public async read(): Promise<GameConfig> {
        return await super.read(this.adapter.getName());
    }

    public async save(config: GameConfig) {
        await super.write(config);
    }
}