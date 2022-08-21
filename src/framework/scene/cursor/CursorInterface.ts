import ModelInterface from '../model/ModelInterface';

export default interface CursorInterface {
    update(delta: number): void;
    remove(): void;
}