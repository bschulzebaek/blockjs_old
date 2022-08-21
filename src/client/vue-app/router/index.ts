import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from) => {
    console.debug(`[ROUTER] "${from.name?.toString()}" -> "${to.name?.toString()}"`)
});

export {
    router as default
}