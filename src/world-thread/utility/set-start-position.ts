import EntityRepository from '../../scene-thread/entity/EntityRepository';
import WorldContainer from '../WorldContainer';
import StorageAdapter from '../../shared/storage/StorageAdapter';
import { PLAYER_ENTITY_ID } from '../../data/player-data';
import { WORLD_SEA_LEVEL } from '../../data/world-config';
import { Vector3 } from '../../shared/math';

export default async function setStartPosition() {
    const entityRepository = new EntityRepository(new StorageAdapter(WorldContainer.getConfig().getId())),
          playerEntity     = await entityRepository.read(PLAYER_ENTITY_ID);

    playerEntity.setWorld(WorldContainer.getWorld());
    playerEntity.setPosition(new Vector3(0, WORLD_SEA_LEVEL, 0));

    const position = playerEntity.getPosition();

    do {
        position.add(0, 1, 0);
        playerEntity.setPosition(position);
    } while (playerEntity.isBlocked());

    while (playerEntity.canFall()) {
        position.add(0, -1, 0);
        playerEntity.setPosition(position);
    }

    await entityRepository.write(playerEntity);
}