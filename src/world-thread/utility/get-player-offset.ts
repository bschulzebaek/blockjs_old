import EntityRepository from '../../scene-thread/entity/EntityRepository';
import WorldContainer from '../WorldContainer';
import StorageAdapter from '../../shared/storage/StorageAdapter';
import { PLAYER_ENTITY_ID } from '../../data/player-data';

export default async function() {
    const entityRepository = new EntityRepository(new StorageAdapter(WorldContainer.getConfig().getId())),
          playerEntity     = await entityRepository.read(PLAYER_ENTITY_ID);

    return playerEntity.getPosition();
}