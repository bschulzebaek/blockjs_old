
import EntityRepository from './EntityRepository';
import Entity from './Entity';
import Service from '../../core/Service';
import StorageAdapter from '../../core/storage/StorageAdapter';

export default class EntityService extends Service {
    static PLAYER_ID = 'player';
    static PLAYER_POSITION = '0:32:0';

    private repository: EntityRepository;

    private entities: Map<string, Entity> = new Map();

    constructor(adapter: StorageAdapter) {
        super();

        this.repository = new EntityRepository(adapter);
    }

    public async new() {
        const id = EntityService.PLAYER_ID,
              player = new Entity(id);

        this.entities.set(id, player);

        await this.repository.write(this.entities.get(id)!);
    }

    public async load() {
        await this.getAll();
    }

    public async discard() {
        await this.repository.writeList(Array.from(this.entities.values()));
    }

    public getPlayer() {
        return this.entities.get(EntityService.PLAYER_ID);
    }

    public async getAll() {
        const entities = await this.repository.readAll();

        entities.forEach((entity) => {
            this.entities.set(entity.getId(), entity);
        });
    }
}