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

    public async read(id: string) {
        if (this.entities.has(id)) {
            return this.entities.get(id);
        }

        const entity = await this.repository.read(id);

        if (!entity) {
            throw new Error(`[EntityService] entity "${id}" undefined!`);
        }

        this.entities.set(id, entity);

        return this.entities.get(id);
    }

    public async readAll() {
        const entities = await this.repository.readAll();

        entities.forEach((entity) => {
            this.entities.set(entity.getId(), entity);
        });
    }

    public async save(entities = this.getAll()) {
        await this.repository.writeList(entities);
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