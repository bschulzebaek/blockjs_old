export default interface SceneObjectInterface {
    getId(): string;
    update(delta: number): void;
    createModel?(): void;
    discard?(): void;
    getRenderData(): any;
    getTransferable?(): Transferable[];
}