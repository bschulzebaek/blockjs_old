import useBlock from './actions/use-block';
import placeBlock from './actions/place-block';
import destroyBlock from './actions/destroy-block';
import getBlockFromRay from '../../engine/scene/world-helper/get-block-from-ray';
import InteractiveBlocks from '../../data/interactive-blocks';
import SceneContainer from '../../engine/scene/SceneContainer';

// @ts-ignore
function onLeftClick(event: MouseEvent) {
    const camera = SceneContainer.getScene().getCamera();

    const block = getBlockFromRay(camera.getTransform().getPosition(), camera.getRay().fromScreen().ray);

    if (block) {
        destroyBlock(block);
    }
}

function onRightClick(event: MouseEvent) {
    const camera = SceneContainer.getScene().getCamera();

    const block = getBlockFromRay(camera.getTransform().getPosition(), camera.getRay().fromScreen().ray);

    if (!block) {
        return;
    }

    // @ts-ignore
    const { shiftKey } = event.detail;

    if (InteractiveBlocks.includes(block.blockId) && !shiftKey) {
        useBlock(block);
    } else {
        placeBlock(block);
    }
}

export {
    onLeftClick,
    onRightClick,
}