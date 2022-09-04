import Scene from './Scene';

Object.defineProperty(globalThis, 'innerWidth', { value: 1920 });
Object.defineProperty(globalThis, 'innerHeight', { value: 1080 });

class SceneContainer {
    private scene = new Scene();
    private renderPort?: MessagePort;
    private worldPort?: MessagePort;

    public setRenderPort(port: MessagePort) {
        this.renderPort = port;
    }

    public getRenderPort() {
        if (!this.renderPort) {
            throw new Error('[SceneContainer] renderPort undefined!');
        }

        return this.renderPort;
    }

    public setWorldPort(port: MessagePort) {
        this.worldPort = port;
    }

    public getWorldPort() {
        if (!this.renderPort) {
            throw new Error('[SceneContainer] worldPort undefined!');
        }

        return this.worldPort;
    }

    public getScene() {
        return this.scene;
    }
}

export default new SceneContainer()