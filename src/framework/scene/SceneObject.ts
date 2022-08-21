export default class SceneObject {
    // @ts-ignore
    public update(delta: number) {
        throw new Error('[SceneObject] Must be implemented!');
    }

    public createModel() {
        throw new Error('[SceneObject] Must be implemented!');
    }

    public createShader() {
        throw new Error('[SceneObject] Must be implemented!');
    }
}