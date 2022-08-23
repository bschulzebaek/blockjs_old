
import EntityRepository from './EntityRepository';
import Entity from './Entity';
import Container, { ServiceName } from '../../core/Container';
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

    public async create(): Promise<Entity> {
        const player = new Entity(EntityService.PLAYER_ID);

        player.setInventoryId(await Container.getService(ServiceName.INVENTORY).createInventory());

        this.entities.set(player.getId(), player);

        await this.repository.write(player);

        return player;
    }

    public getPlayer() {
        return this.entities.get(EntityService.PLAYER_ID);
    }

    public async getAll() {
        const entities = await this.repository.readAll();

        entities.forEach((entity) => {
            this.entities.set(entity.getId(), entity);
        });

        await Container.getService(ServiceName.INVENTORY).loadInventory(
            this.entities.get(EntityService.PLAYER_ID)?.getInventoryId()!
        );
    }

    public async discard() {
        await this.repository.writeList(Array.from(this.entities.values()));
    }
}