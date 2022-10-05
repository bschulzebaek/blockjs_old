import SceneContainer from '../SceneContainer';
import getBlockFromRay from '../../../shared/utility/get-block-from-ray';
import InteractiveBlocks from '../../../data/interactive-blocks';
import destroyBlock from '../../../framework/actions/destroy-block';
import placeBlock from '../../../framework/actions/place-block';
import useBlock from '../../../framework/actions/use-block';

class InputSubscriber {
    constructor() {
        addEventListener('click', this.onClick);
    }

    private onClick = (event: MouseEvent) => {
        // @ts-ignore
        const { button } = event.detail;

        if (button === 0) {
            this.onLeftClick(event);
        } else if (button === 2) {
            this.onRightClick(event);
        }
    }

    // @ts-ignore
    private onLeftClick(event: MouseEvent) {
        const camera = SceneContainer.getCamera();

        const block = getBlockFromRay(
            SceneContainer.getWorld(),
            camera.getTransform().getPosition(),
            camera.getRay().fromScreen().ray,
            8,
        );

        if (block) {
            destroyBlock(block);
        }
    }

    private onRightClick(event: MouseEvent) {
        const camera = SceneContainer.getCamera();

        const block = getBlockFromRay(
            SceneContainer.getWorld(),
            camera.getTransform().getPosition(),
            camera.getRay().fromScreen().ray,
            8,
        );

        if (!block) {
            return;
        }

        // @ts-ignore
        const { shiftKey, activeItem } = event.detail;

        if (InteractiveBlocks.includes(block.blockId) && !shiftKey) {
            useBlock(block);
        } else {
            placeBlock(block, activeItem);
        }
    }
}

export default new InputSubscriber()