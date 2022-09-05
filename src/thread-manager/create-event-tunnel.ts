import ThreadManager, { ThreadNames } from './ThreadManager';
import { GeneralMessages } from './ThreadMessages';
import StateMachine from '../main-thread/StateMachine';
import MainContainer from '../main-thread/MainContainer';
import { Views } from '../data/views';

let threads: ThreadNames[] = [];

function createEventTunnel(threadNames: ThreadNames[]) {
    window.addEventListener('keypress', passKeyboardEvent);
    window.addEventListener('keydown', passKeyboardEvent);
    window.addEventListener('keyup', passKeyboardEvent);
    window.addEventListener('click', passPointerEvent);
    window.addEventListener('contextmenu', passPointerEvent);
    window.addEventListener('mousemove', passMouseEvent);

    threads = threadNames;
}

function discardEventTunnel() {
    window.removeEventListener('keypress', passKeyboardEvent);
    window.removeEventListener('keydown', passKeyboardEvent);
    window.removeEventListener('keyup', passKeyboardEvent);
    window.removeEventListener('click', passPointerEvent);
    window.removeEventListener('contextmenu', passPointerEvent);
    window.removeEventListener('mousemove', passMouseEvent);

    threads = [];
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


    threads.forEach((thread) => {
        ThreadManager.send(thread, GeneralMessages.INPUT_EVENT, {
            ...eventDetail,
            activeItem: MainContainer.getInventoryService().getPlayerInventory().getActiveItem(),
        });
    });
}

export {
    createEventTunnel,
    discardEventTunnel,
}