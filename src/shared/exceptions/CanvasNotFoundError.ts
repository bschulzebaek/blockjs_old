export default class CanvasNotFoundError extends Error {
    constructor() {
        super(`UI canvas not found!`);
    }
}