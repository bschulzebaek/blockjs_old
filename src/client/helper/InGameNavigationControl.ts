import { type Router } from 'vue-router';
import { Views } from '../router/routes';

const keyDownMap: Map<string, null> = new Map();

enum MAPPED_ACTIONS {
    MENU = 'Escape',
    INVENTORY = 'e',
}

function onPauseKey(router: Router) {
    const { name } = router.currentRoute.value;

    if (name === Views.GAME_PAUSE || name === Views.GAME_CHEST || name === Views.GAME_CRAFTING_TABLE || name === Views.GAME_INVENTORY) {
        router.push({ name: Views.GAME_DEFAULT });
    } else {
        router.push({ name: Views.GAME_PAUSE });
    }
}

function onInventoryKey(router: Router) {
    const { name } = router.currentRoute.value;

    if (name === Views.GAME_INVENTORY || name === Views.GAME_CHEST || name === Views.GAME_CRAFTING_TABLE) {
        router.push({ name: Views.GAME_DEFAULT });
    } else if (name === Views.GAME_DEFAULT) {
        router.push({ name: Views.GAME_INVENTORY });
    }
}

function navigationControlKeyDown(event: KeyboardEvent, router: Router) {
    if (!document.fullscreenElement) {
        return;
    }

    const { key } = event;

    if (keyDownMap.has(key)) {
        return;
    }

    keyDownMap.set(key, null);

    switch (key) {
        case MAPPED_ACTIONS.MENU:
            return onPauseKey(router);
        case MAPPED_ACTIONS.INVENTORY:
            return onInventoryKey(router);
    }

}

function navigationControlKeyUp(event: KeyboardEvent) {
    if (event.key !== MAPPED_ACTIONS.MENU && event.key !== MAPPED_ACTIONS.INVENTORY) {
        return;
    }

    keyDownMap.delete(event.key);
}

export {
    navigationControlKeyDown,
    navigationControlKeyUp
}