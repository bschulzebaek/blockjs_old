import SceneContainer from '../../SceneContainer';
import { PLAYER_ENTITY_ID } from '../../../data/player-data';
import { WORLD_SEA_LEVEL } from '../../../data/world-config';
import { Vector3 } from '../../../shared/math';

export default async function setStartPosition() {
    const entityService = SceneContainer.getEntityService(),
          playerEntity = (await entityService.read(PLAYER_ENTITY_ID))!;

    playerEntity.setWorld(SceneContainer.getWorld());
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

    await entityService.save([ playerEntity ]);
}