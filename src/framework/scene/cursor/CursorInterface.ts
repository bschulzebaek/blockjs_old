import ModelInterface from '../model/ModelInterface';

export default interface CursorInterface {
    model?: ModelInterface;

    update(delta: number): void;
    remove(): void;
}