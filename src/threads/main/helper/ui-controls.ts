import { Views } from '../../../data/views';
import Container from '../Container';

const keyMap: Map<string, boolean> = new Map();

enum MAPPED_ACTIONS {
    PAUSE = 'Escape',
    INVENTORY = 'e',
}

function onKeyDown(event: KeyboardEvent) {
    if (!Container.getStateMachine().isInGame()) {
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
    const stateMachine = Container.getStateMachine();

    if (stateMachine.isRoute(Views.GAME_PAUSE) || stateMachine.isRoute(Views.GAME_CHEST) || stateMachine.isRoute(Views.GAME_CRAFTING_TABLE) || stateMachine.isRoute(Views.GAME_INVENTORY)) {
        stateMachine.pushTransition(Views.GAME_DEFAULT);
    } else {
        stateMachine.pushTransition(Views.GAME_PAUSE);
    }
}

function onKeyInventory() {
    const stateMachine = Container.getStateMachine();

    if (stateMachine.isRoute(Views.GAME_CHEST) || stateMachine.isRoute(Views.GAME_CRAFTING_TABLE) || stateMachine.isRoute(Views.GAME_INVENTORY)) {
        stateMachine.pushTransition(Views.GAME_DEFAULT);
    } else if (stateMachine.isRoute(Views.GAME_DEFAULT)) {
        stateMachine.pushTransition(Views.GAME_INVENTORY);
    }
}

export {
    onKeyUp,
    onKeyDown,
}