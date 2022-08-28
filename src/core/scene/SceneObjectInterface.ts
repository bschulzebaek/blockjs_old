export default interface SceneObjectInterface {
    getId(): string;
    update(delta: number): void;
    createModel?(): void;
    createShader?(): void;
    discard?(): Promise<void>;
}