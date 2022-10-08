export default class ChunkNotFoundError extends Error {
    constructor(id: string) {
        super(`Chunk with id "${id}" does not exist!`);
    }
}