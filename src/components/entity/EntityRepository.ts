import Entity from './Entity';
import WorldInterface from '../../components/world/WorldInterface';
import { Vector3 } from '../../shared/math';
import generateUUID from '../../shared/utility/generate-uuid';
import Repository from '../../shared/storage/Repository';
import StorageAdapter from '../../shared/storage/StorageAdapter';

export default class EntityRepository extends Repository {
    static STORE_NAME = 'entity';
    static STORE_IDENTIFIER = 'id';

    constructor(adapter: StorageAdapter) {
        super(adapter, EntityRepository.STORE_NAME, Entity);
    }

    public create(position: Vector3, world: WorldInterface, id = generateUUID()): Entity {
        return super.create(id, world, position) as unknown as Entity;
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