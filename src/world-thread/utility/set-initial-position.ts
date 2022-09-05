import EntityRepository from '../../scene-thread/entity/EntityRepository';
import WorldContainer from '../WorldContainer';
import StorageAdapter from '../../shared/storage/StorageAdapter';
import { PLAYER_ENTITY_ID } from '../../data/player-data';
import { WORLD_OCEAN_LEVEL } from '../../data/world-config';

export default async function() {
    const entityRepository = new EntityRepository(new StorageAdapter(WorldContainer.getConfig().getId())),
          playerEntity     = await entityRepository.read(PLAYER_ENTITY_ID);

    playerEntity.setWorld(WorldContainer.getWorld());
    playerEntity.getPosition().add(0, WORLD_OCEAN_LEVEL, 0);

    do {
        const position = playerEntity.getPosition();
        position.add(0, 1, 0);
        playerEntity.setPosition(position);
    } while (playerEntity.isBlocked())

    await entityRepository.write(playerEntity);
}