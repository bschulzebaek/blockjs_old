import PlayerController, { MovementMode } from '../../../components/player/PlayerController';
import SceneContainer from '../SceneContainer';

// @ts-ignore
self.__setGameMode = (mode: MovementMode) => {
    (
        SceneContainer.getScene().getSceneObject('player-controller') as PlayerController
    ).setMode(mode);
}