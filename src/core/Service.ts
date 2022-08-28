export default class Service {
    // @ts-ignore
    public async new(...args: any[]) {
        throw new Error('Must be implemented!');
    }

    // @ts-ignore
    public async load(...args: any[]) {
        throw new Error('Must be implemented!');
    }

    public async discard() {
        throw new Error('Must be implemented!');
    }
}