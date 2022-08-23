import ModelInterface from '../../core/scene/model/ModelInterface';

export default interface ChunkInterface {
    getSolidModel(): ModelInterface;
    getGlassModel(): ModelInterface;
    setBlockId(x: number, y: number, z: number, blockId: number): void;
    getBlockId(x: number, y: number, z: number, dir?: number): number;
    getX(): number;
    getZ(): number;
    getBlock(index: number): number;
    getBlocks(): number[];
    isOutOfBounds(x: number, y: number, z: number): boolean;
}