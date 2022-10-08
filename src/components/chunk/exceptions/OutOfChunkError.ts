export default class OutOfChunkError extends Error {
    constructor(x: number, y: number, z: number) {
        super(`The provided coordinates "${x}:${y}:${z}" are out of bounds!"`);
    }
}