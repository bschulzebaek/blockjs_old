import ThreadManager, { ThreadNames } from '../game-instance/ThreadManager';
import { GeneralMessages } from '../../shared/messages/ThreadMessages';
import StateMachine from '../StateMachine';
import MainContainer from '../MainContainer';
import { Views } from '../../data/views';

let threads: ThreadNames[] = [];

function createEventTunnel(threadNames: ThreadNames[]) {
    addEventListener('keypress', passKeyboardEvent);
    addEventListener('keydown', passKeyboardEvent);
    addEventListener('keyup', passKeyboardEvent);
    addEventListener('click', passPointerEvent);
    addEventListener('contextmenu', passPointerEvent);
    addEventListener('mousemove', passMouseEvent);

    threads = threadNames;
}

function discardEventTunnel() {
    removeEventListener('keypress', passKeyboardEvent);
    removeEventListener('keydown', passKeyboardEvent);
    removeEventListener('keyup', passKeyboardEvent);
    removeEventListener('click', passPointerEvent);
    removeEventListener('contextmenu', passPointerEvent);
    removeEventListener('mousemove', passMouseEvent);

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