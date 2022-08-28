import CameraInterface from '../client/camera/CameraInterface';
import ChunkInterface from './chunk/ChunkInterface';
import BlockID from '../data/block-id';

export default interface WorldInterface {
    update(): void;
    createShader(camera: CameraInterface): void;
    createModel(): void;
    getChunks(): ChunkInterface[];
    pushChunk(chunk: ChunkInterface): void;
    getBlockId(x: number, y: number, z: number): BlockID;
}