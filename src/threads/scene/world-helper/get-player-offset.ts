import SceneContainer from '../SceneContainer';
import { PLAYER_ENTITY_ID } from '../../../data/player-data';
import Chunk from '../../../components/chunk/Chunk';

export default async function getPlayerOffset() {
    const playerEntity = await SceneContainer.getEntityService().read(PLAYER_ENTITY_ID);

    return Chunk.convertToChunkPosition(playerEntity!.getPosition());
}