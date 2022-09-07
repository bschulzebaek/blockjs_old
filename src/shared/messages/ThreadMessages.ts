export enum BroadcastMessages {
    START = 'start',
    STOP = 'stop',
    DISCARD = 'discard',
    SETUP_CONTAINER = 'setup-container',
}

export enum GeneralMessages {
    CONNECT = 'connect',
    INPUT_EVENT = 'input-event',
}

export enum RenderMessages {
    SYNC_SCENE = 'sync-scene',
    SYNC_SCENE_OBJECT = 'sync-scene-object',
    DELETE_SCENE_OBJECTS = 'delete-scene-objects',
    SYNC_CAMERA = 'sync-camera',
    SYNC_CHUNK = 'sync-chunk',
    POP_CHUNKS = 'pop-chunks',
    SET_CANVAS = 'set-canvas',
}

export enum SceneMessages {
    SETUP = 'setup',
    SYNC_WORLD = 'sync-world',
    SYNC_CHUNK = 'sync-chunk',
    REQUEST_WORLD_UPDATE = 'request-world-update',
    REQUEST_WORLD_CHANGE = 'request-world-change',
    REDUCE_QUANTITY = 'reduce-quantity',
    TO_VIEW = 'to-view',
    PICKUP_ITEM = 'pickup',
}

export enum WorldMessages {
    CREATE = 'create',
    READY = 'ready',
}