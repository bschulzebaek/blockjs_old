export default class Message {
    static send(action: string, detail: any = {}, port: MessagePort|typeof globalThis = self) {
        port.postMessage({
            action,
            detail
        });
    }
}