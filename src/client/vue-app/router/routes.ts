enum Views {
    NOT_FOUND = 'not-found',
    MAIN_MENU = 'main-menu',
    MAIN_MENU_LOAD = 'main-menu-load',
    MAIN_MENU_NEW = 'main-menu-new',
    MAIN_MENU_SETTINGS = 'main-menu-settings',
    GAME = 'game',
    GAME_SETUP = 'game-setup',
    GAME_TEARDOWN = 'game-teardown',
    GAME_DEFAULT = 'game-default',
    GAME_PAUSE = 'game-pause',
    GAME_INVENTORY = 'game-inventory',
    GAME_CHEST = 'game-chest',
    GAME_CRAFTING_TABLE = 'game-crafting-table',
}

enum Paths {
    NOT_FOUND = '/:pathMatch(.*)*',
    MAIN_MENU = '',
    MAIN_MENU_LOAD = '/load',
    MAIN_MENU_NEW = '/new',
    MAIN_MENU_SETTINGS = '/settings',
    GAME = '/game',
    GAME_DEFAULT = '',
    GAME_PAUSE = '/game/pause',
    GAME_INVENTORY = '/game/inventory',
    GAME_CHEST = '/game/chest/:id',
    GAME_CRAFTING_TABLE = '/game/crafting',
    GAME_SETUP = '/setup',
    GAME_TEARDOWN = '/teardown',
}

const ROUTES_MAIN_MENU = [{
    name: Views.MAIN_MENU,
    path: Paths.MAIN_MENU,
    component: () => import('../views/MainMenu.vue')
}, {
    name: Views.MAIN_MENU_NEW,
    path: Paths.MAIN_MENU_NEW,
    component: () => import('../views/MainMenu_New.vue')
}, {
    name: Views.MAIN_MENU_LOAD,
    path: Paths.MAIN_MENU_LOAD,
    component: () => import('../views/MainMenu_Load.vue')
}, {
    name: Views.MAIN_MENU_SETTINGS,
    path: Paths.MAIN_MENU_SETTINGS,
    component: () => import('../views/MainMenu_Settings.vue')
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
    }]
}, {
    name: Views.GAME_SETUP,
    path: Paths.GAME_SETUP,
    component: () => import('../views/Setup.vue')
}, {
    name: Views.GAME_TEARDOWN,
    path: Paths.GAME_TEARDOWN,
    component: () => import('../views/Teardown.vue')
}]

const ROUTES_SYSTEM = [{
    name: Views.NOT_FOUND,
    path: Paths.NOT_FOUND,
    redirect: {
        name: Views.MAIN_MENU
    }
}];

const routes = [...ROUTES_MAIN_MENU, ...ROUTES_GAME, ...ROUTES_SYSTEM];

export {
    Views,
    Paths,
    routes
}