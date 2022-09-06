import ThreadManager, { ThreadNames } from '../game-instance/ThreadManager';
import { GeneralMessages } from '../../shared/messages/ThreadMessages';
import StateMachine from '../StateMachine';
import MainContainer from '../MainContainer';
import { Views } from '../../data/views';

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
    if (!StateMachine.isRoute(Views.GAME_DEFAULT)) {
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
    if (!StateMachine.isRoute(Views.GAME_DEFAULT)) {
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
    if (!StateMachine.isRoute(Views.GAME_DEFAULT)) {
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
        activeItem: MainContainer.getInventoryService().getPlayerInventory().getActiveItem(),
    });
}

export {
    createSceneEventTunnel,
    discardSceneEventTunnel,
}