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
    GAME_SETUP = '/game/setup',
    GAME_TEARDOWN = '/game/teardown',
}

export {
    Views,
    Paths
}