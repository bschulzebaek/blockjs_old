
import useBlock from './actions/use-block';
import placeBlock from './actions/place-block';
import destroyBlock from './actions/destroy-block';
import Container from '../container/Container';
import getBlockFromRay from '../../common/utility/get-block-from-ray';
import InteractiveBlocks from '../../data/interactive-blocks';
import type Camera from '../../content/camera/Camera';

// @ts-ignore
function onLeftClick(event: MouseEvent) {
    const camera = Container.getScene().getSceneObject('camera') as Camera;

    const block = getBlockFromRay(camera.getTransform().getPosition(), camera.getRay().fromScreen().ray);

    if (block) {
        destroyBlock(block);
    }
}

function onRightClick(event: MouseEvent) {
    const camera = Container.getScene().getSceneObject('camera') as Camera;

    const block = getBlockFromRay(camera.getTransform().getPosition(), camera.getRay().fromScreen().ray);

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