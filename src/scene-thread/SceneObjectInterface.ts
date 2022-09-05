import ModelInterface from './model/ModelInterface';

export default interface SceneObjectInterface {
    model?: ModelInterface;
    getId(): string;
    getShader(): string;
    update(delta: number): void;
    createModel?(): void;
    discard?(): Promise<void>;
}