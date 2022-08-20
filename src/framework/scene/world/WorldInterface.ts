import ChunkInterface from './chunk/ChunkInterface';

export default interface WorldInterface {
    getChunks(): ChunkInterface[];
    pushChunk(chunk: ChunkInterface): void;
    getBlockId(x: number, y: number, z: number): BlockID;
}