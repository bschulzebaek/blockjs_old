import ServiceInterface from '../ServiceInterface';
import EntityRepository from './EntityRepository';
import StorageAdapter from '../storage/StorageAdapter';
import Entity from './Entity';
import Vector3 from '../../math/Vector3';

export default class EntityService implements ServiceInterface {
    static PLAYER_ID = 'player'; // hardcoded ID so we don't need an extra store or repository or entity for player data
    static PLAYER_POSITION = '0:32:0';

    private repository: EntityRepository;

    private entities: Map<string, Entity> = new Map();

    constructor(adapter: StorageAdapter) {
        this.repository = new EntityRepository(adapter);
    }

    public createPlayer(): Entity {
        const player = new Entity(EntityService.PLAYER_ID, new Vector3(0, 0, 0));

        this.entities.set(player.getId(), player);

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
    }

    public async discard() {
        await this.repository.writeList(Array.from(this.entities.values()));
    }
}