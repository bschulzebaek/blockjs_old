import BlockID from '../../data/block-id';
import Chunk from '../chunk/Chunk';
import BlockInterface from '../chunk/BlockInterface';

export default interface WorldInterface {
    chunkExists(id: string): boolean;
    getMap(): Map<string, Chunk>;
    getChunkByWorldPosition(x: number, z: number): Chunk | undefined;
    getChunkByBlockPosition(x: number, z: number): Chunk | undefined;
    getChunkById(id: string): Chunk | undefined;
    getChunks(): Chunk[];
    pushChunk(chunk: Chunk): void;
    popChunk(id: string): Chunk;
    getBlockId(x: number, y: number, z: number): BlockID;
    getBlock(x: number, y: number, z: number): BlockInterface | undefined;
    setBlockId(x: number, y: number, z: number, blockId: BlockID): void;
}