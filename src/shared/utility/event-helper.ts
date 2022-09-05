import Events from '../../data/events';

function subscribe(eventName: Events, callback: Function) {
    // @ts-ignore
    addEventListener(eventName, callback);
}

function unsubscribe(eventName: Events, callback: Function) {
    // @ts-ignore
    removeEventListener(eventName, callback);
}

function publish(event: Event) {
    dispatchEvent(event);
}

export {
    subscribe,
    unsubscribe,
    publish,
}