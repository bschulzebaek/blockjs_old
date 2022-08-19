export default class EventHelper {
    static subscribe(eventName: string, callback: any) {
        window.gameManager.getCanvas().addEventListener(eventName, callback);
    }

    static dispatch(eventName: string, eventDetails: unknown = {}) {
        window.gameManager.getCanvas().dispatchEvent(EventHelper.createEvent(eventName, eventDetails));
    }

    static createEvent(name: string, detail: unknown): CustomEvent {
        return new CustomEvent(name, { bubbles: false, cancelable: false, detail });
    }
}