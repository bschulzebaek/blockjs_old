import ThreadManager, { ThreadNames } from '../thread-manager/ThreadManager';
import { GeneralMessages } from '../../../shared/messages/ThreadMessages';
import Container from '../Container';
import { Views } from '../../../data/views';

function createSceneEventTunnel() {
    addEventListener('keypress', passKeyboardEvent);
    addEventListener('keydown', passKeyboardEvent);
    addEventListener('keyup', passKeyboardEvent);
    addEventListener('click', passPointerEvent);
    addEventListener('contextmenu', passPointerEvent);
    addEventListener('mousemove', passMouseEvent);
}

function discardSceneEventTunnel() {
    removeEventListener('keypress', passKeyboardEvent);
    removeEventListener('keydown', passKeyboardEvent);
    removeEventListener('keyup', passKeyboardEvent);
    removeEventListener('click', passPointerEvent);
    removeEventListener('contextmenu', passPointerEvent);
    removeEventListener('mousemove', passMouseEvent);
}

function passKeyboardEvent(event: KeyboardEvent) {
    if (!Container.getStateMachine().isRoute(Views.GAME_DEFAULT)) {
        return;
    }

    event.preventDefault();

    const { type, key, shiftKey } = event;

    sendInputEvent({
        type,
        key,
        shiftKey,
    });
}

function passPointerEvent(event: MouseEvent) {
    if (!Container.getStateMachine().isRoute(Views.GAME_DEFAULT)) {
        return;
    }

    event.preventDefault();

    const { type, button, shiftKey } = event;

    sendInputEvent({
        type,
        button,
        shiftKey,
    });
}

function passMouseEvent(event: MouseEvent) {
    if (!Container.getStateMachine().isRoute(Views.GAME_DEFAULT)) {
        return;
    }

    event.preventDefault();

    const { type, movementX, movementY } = event;

    sendInputEvent({
        type,
        movementX,
        movementY
    });
}

function sendInputEvent(eventDetail: object) {
    ThreadManager.send(ThreadNames.SCENE, GeneralMessages.INPUT_EVENT, {
        ...eventDetail,
        activeItem: Container.getInventoryService().getPlayerInventory().getActiveItem(),
    });
}

export {
    createSceneEventTunnel,
    discardSceneEventTunnel,
}