export enum BroadcastMessages {
    START = 'start',
    STOP = 'stop',
    DISCARD = 'discard',
}

export enum GeneralMessages {
    CONNECT = 'connect',
    INPUT_EVENT = 'input-event',
}

export enum RenderMessages {
    SYNC_SCENE = 'sync-scene',
    SYNC_WORLD = 'sync-world',
    SET_CANVAS = 'set-canvas',
}

export enum SceneMessages {
    SETUP = 'setup',
    SYNC_WORLD = 'sync-world',
    REQUEST_WORLD_UPDATE = 'request-world-update',
    REQUEST_WORLD_CHANGE = 'request-world-change',
}

export enum WorldMessages {
    CREATE = 'create',
    READY = 'ready',
}