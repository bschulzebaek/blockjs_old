export default interface SceneObjectInterface {
    getId(): string;
    update(delta: number): void;
    createModel?(): void;
    createShaderReference?(): void;
    discard?(): Promise<void>;
}