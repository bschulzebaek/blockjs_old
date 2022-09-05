import router from '../../user-interface/router';
import { Views } from '../../user-interface/router/routes';
import StateMachine from '../StateMachine';

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
        router.push({ name: Views.GAME_DEFAULT });
    } else {
        router.push({ name: Views.GAME_PAUSE });
    }
}

function onKeyInventory() {
    if (StateMachine.isRoute(Views.GAME_CHEST) || StateMachine.isRoute(Views.GAME_CRAFTING_TABLE) || StateMachine.isRoute(Views.GAME_INVENTORY)) {
        router.push({ name: Views.GAME_DEFAULT });
    } else if (StateMachine.isRoute(Views.GAME_DEFAULT)) {
        router.push({ name: Views.GAME_INVENTORY });
    }
}

export {
    onKeyUp,
    onKeyDown,
}