import EntityRepository from '../../scene-thread/entity/EntityRepository';
import StorageAdapter from '../../shared/storage/StorageAdapter';
import { PLAYER_ENTITY_ID } from '../../data/player-data';
import Entity from '../../scene-thread/entity/Entity';

export default async function(id: string) {
    const entityRepository = new EntityRepository(new StorageAdapter(id)),
          player           = new Entity(PLAYER_ENTITY_ID);


    await entityRepository.write(player);
}