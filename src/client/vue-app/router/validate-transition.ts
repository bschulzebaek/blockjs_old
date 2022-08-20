import { RouteLocationNormalized } from 'vue-router';
import { Views } from './routes';

type ViewName = `${Views}`;

const REQUIRED_FROM_ROUTE: Partial<Record<ViewName, string[]>> = {
    [Views.GAME]: [Views.GAME_SETUP],
    [Views.GAME_TEARDOWN]:[Views.GAME]
}


const REQUIRED_TO_ROUTE: Partial<Record<ViewName, string[]>> = {
    [Views.GAME]: [Views.GAME_TEARDOWN],
    [Views.GAME_SETUP]: [Views.GAME]
}

export default function validateTransition(to: RouteLocationNormalized, from: RouteLocationNormalized): boolean {
    const fromName = from.name as Views,
          toName   = to.name as Views;

          return true;

    let valid = true;

    if (REQUIRED_FROM_ROUTE[toName] && !REQUIRED_FROM_ROUTE[toName]?.includes(fromName)) {
        valid = false;
    } else if (REQUIRED_TO_ROUTE[fromName] && !REQUIRED_TO_ROUTE[fromName]?.includes(toName)) {
        valid = false;
    }

    if (!valid) {
        console.error(`[ROUTER] Invalid route transition!`, { from, to });
    }

    return valid;
}