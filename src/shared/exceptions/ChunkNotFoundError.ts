export default class ChunkNotFoundError extends Error {
    constructor(id: string) {
        super(`Chunk "${id}" not found!`);
    }
}