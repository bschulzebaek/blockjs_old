import ThreadManager, { ThreadNames } from './threads/ThreadManager';
import { GeneralMessages } from './threads/ThreadMessages';

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
    if (!document.fullscreenElement) {
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
    if (!document.fullscreenElement) {
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
    if (!document.fullscreenElement) {
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

function sendInputEvent(eventDetail: any) {
    threads.forEach((thread) => {
        ThreadManager.send(thread, GeneralMessages.INPUT_EVENT, eventDetail);
    });
}

export {
    createEventTunnel,
    discardEventTunnel,
}