import BlockID from '../data/block-id';
import Chunk from './chunk/Chunk';

export default interface WorldInterface {
    getMap(): Map<string, Chunk>;
    getChunk(x: number, z: number): Chunk | undefined;
    getChunkById(id: string): Chunk | undefined;
    getChunks(): Chunk[];
    pushChunk(chunk: Chunk): void;
    popChunk(id: string): Chunk;
    getBlockId(x: number, y: number, z: number): BlockID;
    setBlockId(x: number, y: number, z: number, blockId: BlockID): void;
}