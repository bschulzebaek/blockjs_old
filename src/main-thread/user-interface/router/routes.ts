import { Paths, Views } from '../../../data/views';

const ROUTES_MAIN_MENU = [{
    name: Views.MAIN_MENU,
    path: Paths.MAIN_MENU,
    component: () => import('../views/MainMenu/Index.vue')
}, {
    name: Views.MAIN_MENU_NEW,
    path: Paths.MAIN_MENU_NEW,
    component: () => import('../views/MainMenu/New.vue')
}, {
    name: Views.MAIN_MENU_LOAD,
    path: Paths.MAIN_MENU_LOAD,
    component: () => import('../views/MainMenu/Load.vue')
}, {
    name: Views.MAIN_MENU_SETTINGS,
    path: Paths.MAIN_MENU_SETTINGS,
    component: () => import('../views/MainMenu/Settings.vue')
}];

const ROUTES_GAME = [{
    name: Views.GAME,
    path: Paths.GAME,
    component: () => import('../views/Game/Index.vue'),
    children: [{
        name: Views.GAME_DEFAULT,
        path: Paths.GAME_DEFAULT,
        component: () => import('../views/Game/Default.vue'),
    }, {
        name: Views.GAME_PAUSE,
        path: Paths.GAME_PAUSE,
        component: () => import('../views/Game/Pause.vue'),
    }, {
        name: Views.GAME_INVENTORY,
        path: Paths.GAME_INVENTORY,
        component: () => import('../views/Game/Inventory.vue'),
    }, {
        name: Views.GAME_CHEST,
        path: Paths.GAME_CHEST,
        component: () => import('../views/Game/Chest.vue'),
    }, {
        name: Views.GAME_CRAFTING_TABLE,
        path: Paths.GAME_CRAFTING_TABLE,
        component: () => import('../views/Game/CraftingTable.vue'),
    }, {
        name: Views.GAME_SETUP,
        path: Paths.GAME_SETUP,
        component: () => import('../views/Game/Setup.vue')
    }, {
        name: Views.GAME_TEARDOWN,
        path: Paths.GAME_TEARDOWN,
        component: () => import('../views/Game/Teardown.vue')
    }]
}]

const ROUTES_SYSTEM = [{
    name: Views.NOT_FOUND,
    path: Paths.NOT_FOUND,
    redirect: {
        name: Views.MAIN_MENU
    }
}];

const routes = [...ROUTES_MAIN_MENU, ...ROUTES_GAME, ...ROUTES_SYSTEM];

export default routes