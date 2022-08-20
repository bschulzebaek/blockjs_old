import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './routes';
import validateTransition from './validate-transition';

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach(validateTransition);

export {
    router as default
}