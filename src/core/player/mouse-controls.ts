
import useBlock from './actions/use-block';
import placeBlock from './actions/place-block';
import destroyBlock from './actions/destroy-block';
import Container, { ServiceName } from '../Container';
import getBlockFromRay from '../../common/utility/get-block-from-ray';
import InteractiveBlocks from '../../data/interactive-blocks';

// @ts-ignore
function onLeftClick(event: MouseEvent) {
    const sceneService = Container.getService(ServiceName.SCENE),
          camera       = sceneService.getCamera()!;

    const block = getBlockFromRay(camera.transform.position, camera.ray.fromScreen().ray);

    if (block) {
        destroyBlock(block);
    }
}

function onRightClick(event: MouseEvent) {
    const sceneService = Container.getService(ServiceName.SCENE),
          camera       = sceneService.getCamera()!;

    const block = getBlockFromRay(camera.transform.position, camera.ray.fromScreen().ray);

    if (!block) {
        return;
    }

    if (InteractiveBlocks.includes(block.blockId) && !event.shiftKey) {
        useBlock(block);
    } else {
        placeBlock(block);
    }
}

export {
    onLeftClick,
    onRightClick,
}