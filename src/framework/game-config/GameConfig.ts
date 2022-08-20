import GameConfigInterface from './GameConfigInterface';
import StoreClass from '../storage/StoreClass';

export interface GameConfigRawInterface {
    id: string;
    name: string;
    seed: string;
}

export default class GameConfig extends StoreClass implements GameConfigInterface {
    static STORAGE_FIELDS = [
        'id',
        'name',
        'seed',
    ];

    private id: string;
    private name: string;
    private seed: string;

    constructor(id: string, name: string, seed: string) {
        super(id, GameConfig.STORAGE_FIELDS);

        this.id = id;
        this.name = name;
        this.seed = seed;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getSeed(): string {
        return this.seed;
    }

    static createFromRaw(raw: GameConfigRawInterface) {
        return new GameConfig(raw.id, raw.name, raw.seed);
    }
}