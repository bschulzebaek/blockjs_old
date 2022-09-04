import Events from '../../data/events';

function subscribe(eventName: Events, callback: Function) {
    // @ts-ignore
    window.addEventListener(eventName, callback);
}

function unsubscribe(eventName: Events, callback: Function) {
    // @ts-ignore
    window.removeEventListener(eventName, callback);
}

function publish(event: Event) {
    window.dispatchEvent(event);
}

export {
    subscribe,
    unsubscribe,
    publish,
}