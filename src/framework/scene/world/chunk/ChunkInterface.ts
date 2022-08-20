import ModelInterface from '../../model/ModelInterface';

export default interface ChunkInterface {
    getVoxelModel(): ModelInterface;
    getGlassModel(): ModelInterface;
    setBlockId(x: number, y: number, z: number, blockId: number): void;
    getBlockId(x: number, y: number, z: number, dir?: number): number;
    rebuildModel(): void;
    getX(): number;
    getZ(): number;
    getBlock(index: number): number;
    getBlocks(): number[];
    isOutOfBounds(x: number, y: number, z: number): boolean;
}