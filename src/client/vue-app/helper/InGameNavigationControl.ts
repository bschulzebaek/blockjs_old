import { type Router } from 'vue-router';
import { Views } from '../router/routes';

const keyDownMap: Map<string, null> = new Map();

enum SUPPORTED_KEYS {
    ESCAPE = 'Escape',
    E = 'e',
}

function onPauseKey(router: Router) {
    if (router.currentRoute.value.name === Views.GAME_PAUSE) {
        return router.go(-1);
    } else {
        router.push({ name: Views.GAME_PAUSE });
    }
}

function onInventoryKey(router: Router) {
    if (router.currentRoute.value.name === Views.GAME_INVENTORY) {
        router.push({ name: Views.GAME_DEFAULT });
    } else if (router.currentRoute.value.name === Views.GAME_DEFAULT) {
        router.push({ name: Views.GAME_INVENTORY });
    }
}

function navigationControlKeyDown(event: KeyboardEvent, router: Router) {
    if (!document.fullscreenElement) {
        return;
    }

    const { key } = event;

    if (key !== SUPPORTED_KEYS.ESCAPE && key !== SUPPORTED_KEYS.E) {
        return;
    }

    if (keyDownMap.has(key)) {
        return;
    }

    keyDownMap.set(key, null);

    switch (key) {
        case SUPPORTED_KEYS.ESCAPE:
            return onPauseKey(router);
        case SUPPORTED_KEYS.E:
            return onInventoryKey(router);
    }

}

function navigationControlKeyUp(event: KeyboardEvent) {
    if (event.key !== SUPPORTED_KEYS.ESCAPE && event.key !== SUPPORTED_KEYS.E) {
        return;
    }

    keyDownMap.delete(event.key);
}

export {
    navigationControlKeyDown,
    navigationControlKeyUp
}