import BlockID from '../data/block-id';
import ChunkInterface from './chunk/ChunkInterface';
import CameraInterface from '../scene/camera/CameraInterface';

export default interface WorldInterface {
    update(): void;
    createShader(camera: CameraInterface): void;
    getChunks(): ChunkInterface[];
    pushChunk(chunk: ChunkInterface): void;
    getBlockId(x: number, y: number, z: number): BlockID;
}