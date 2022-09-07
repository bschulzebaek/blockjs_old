export default class Message {
    static send(action: string, detail: any = {}, port: MessagePort|typeof globalThis = self, transferable?: Transferable[]) {
        port.postMessage({
            action,
            detail
            // @ts-ignore
        }, transferable);
    }
}