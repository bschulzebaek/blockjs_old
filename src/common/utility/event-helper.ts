import Events from '../../data/events';

function subscribe(eventName: Events, callback: Function) {
    // @ts-ignore
    window.addEventListener(eventName, callback);
}

function publish(event: Event) {
    window.dispatchEvent(event);
}

export {
    subscribe,
    publish
}