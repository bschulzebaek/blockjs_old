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
    UPSERT_RENDER_OBJECT = 'upsert-render-object',
    DELETE_RENDER_OBJECT = 'delete-render-object',

    SYNC_CAMERA = 'sync-camera',
    SET_CANVAS = 'set-canvas',
}

export enum RenderPipelineMessages {
    UPSERT_RENDER_OBJECT = 'upsert-render-object',
    DELETE_RENDER_OBJECT = 'delete-render-object',
}

export enum SceneMessages {
    REDUCE_QUANTITY = 'reduce-quantity',
    TO_VIEW = 'to-view',
    PICKUP_ITEM = 'pickup',
    READY = 'ready',
    CREATE = 'create',
}