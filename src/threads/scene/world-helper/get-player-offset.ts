import SceneContainer from '../SceneContainer';
import { PLAYER_ENTITY_ID } from '../../../data/player-data';

export default async function getPlayerOffset() {
    const playerEntity = await SceneContainer.getEntityService().read(PLAYER_ENTITY_ID);

    return playerEntity!.getPosition();
}