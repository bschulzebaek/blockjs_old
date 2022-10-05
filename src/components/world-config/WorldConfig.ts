import StoreClass from '../../shared/storage/StoreClass';
import WorldConfigInterface from './WorldConfigInterface';
import RawWorldConfigInterface from './RawWorldConfigInterface';

export default class WorldConfig extends StoreClass implements WorldConfigInterface {
    static STORAGE_FIELDS = [
        'id',
        'name',
        'seed',
    ];

    private readonly id: string;
    private readonly name: string;
    private readonly seed: string;
    private readonly isNew: boolean;

    constructor(id: string, name: string, seed: string, isNew: boolean = false) {
        super(id, WorldConfig.STORAGE_FIELDS);

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

    static createFromRaw(raw: RawWorldConfigInterface) {
        return new WorldConfig(raw.id!, raw.name!, raw.seed!);
    }
}