import Entity from './Entity';
import generateUUID from '../../common/utility/generate-uuid';
import Repository from '../../core/storage/Repository';
import StorageAdapter from '../../core/storage/StorageAdapter';

export default class EntityRepository extends Repository {
    static STORE_NAME = 'entity';
    static STORE_IDENTIFIER = 'id';

    constructor(adapter: StorageAdapter) {
        super(adapter, EntityRepository.STORE_NAME, Entity);
    }

    public create(position: string): Entity {
        return super.create(generateUUID(), position) as Entity;
    }

    public async readAll(): Promise<Entity[]> {
        return await super.readAll() as Entity[];
    }

    public async read(entityId: string): Promise<Entity> {
        return await super.read(entityId);
    }

    public async write(entity: Entity) {
        await super.write(entity);
    }

    public async writeList(entities: Entity[]) {
        await super.writeList(entities);
    }
}