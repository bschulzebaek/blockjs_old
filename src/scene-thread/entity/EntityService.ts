import EntityRepository from './EntityRepository';
import Entity from './Entity';
import StorageAdapter from '../../shared/storage/StorageAdapter';
import { PLAYER_ENTITY_ID } from '../../data/player-data';

export default class EntityService {
    private repository: EntityRepository;
    private entities: Map<string, Entity> = new Map();

    constructor(adapter: StorageAdapter) {
        this.repository = new EntityRepository(adapter);
    }

    public async load() {
        const entities = await this.repository.readAll();

        entities.forEach((entity) => {
            this.entities.set(entity.getId(), entity);
        });
    }

    public async save() {
        await this.repository.writeList(this.getAll());
    }

    public async discard() {
        await this.repository.writeList(Array.from(this.entities.values()));
    }

    public getPlayer() {
        if (!this.entities.has(PLAYER_ENTITY_ID)) {
            throw new Error('[EntityService] player entity undefined!');
        }

        return this.entities.get(PLAYER_ENTITY_ID)!;
    }

    public getAll() {
        return Array.from(this.entities.values());
    }
}