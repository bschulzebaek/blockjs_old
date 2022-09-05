import StoreClass from '../../shared/storage/StoreClass';
import GameConfigInterface from './GameConfigInterface';

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
    private isNew: boolean;

    constructor(id: string, name: string, seed: string, isNew: boolean = false) {
        super(id, GameConfig.STORAGE_FIELDS);

        this.id = id;
        this.name = name;
        this.seed = seed;
        this.isNew = isNew;
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

    public getIsNew() {
        return this.isNew;
    }

    static createFromRaw(raw: GameConfigRawInterface) {
        return new GameConfig(raw.id, raw.name, raw.seed);
    }
}