import ChunkInterface from './chunk/ChunkInterface';
import BlockID from '../data/block-id';

export default interface WorldInterface {
    getChunks(): ChunkInterface[];
    pushChunk(chunk: ChunkInterface): void;
    getBlockId(x: number, y: number, z: number): BlockID;
}