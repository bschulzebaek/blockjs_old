import StateMachine from '../StateMachine';
import { Views } from '../../data/views';

const keyMap: Map<string, boolean> = new Map();

enum MAPPED_ACTIONS {
    PAUSE = 'Escape',
    INVENTORY = 'e',
}

function onKeyDown(event: KeyboardEvent) {
    if (!StateMachine.isInGame()) {
        return;
    }

    const { key } = event;

    if (keyMap.has(key)) {
        return;
    }

    keyMap.set(key, true);

    switch (key) {
        case MAPPED_ACTIONS.PAUSE:
            return onKeyPause();
        case MAPPED_ACTIONS.INVENTORY:
            return onKeyInventory();
    }
}

function onKeyUp(event: KeyboardEvent) {
    if (!keyMap.has(event.key)) {
        return;
    }

    keyMap.delete(event.key);
}

function onKeyPause() {
    if (StateMachine.isRoute(Views.GAME_PAUSE) || StateMachine.isRoute(Views.GAME_CHEST) || StateMachine.isRoute(Views.GAME_CRAFTING_TABLE) || StateMachine.isRoute(Views.GAME_INVENTORY)) {
        StateMachine.pushTransition(Views.GAME_DEFAULT);
    } else {
        StateMachine.pushTransition(Views.GAME_PAUSE);
    }
}

function onKeyInventory() {
    if (StateMachine.isRoute(Views.GAME_CHEST) || StateMachine.isRoute(Views.GAME_CRAFTING_TABLE) || StateMachine.isRoute(Views.GAME_INVENTORY)) {
        StateMachine.pushTransition(Views.GAME_DEFAULT);
    } else if (StateMachine.isRoute(Views.GAME_DEFAULT)) {
        StateMachine.pushTransition(Views.GAME_INVENTORY);
    }
}

export {
    onKeyUp,
    onKeyDown,
}