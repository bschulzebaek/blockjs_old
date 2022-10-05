import BlockID from '../../data/block-id';
import BlockInterface from './BlockInterface';
import Model3DInterface from '../../shared/model/Model3DInterface';

export default interface ChunkInterface {
    getSolidModel(): Model3DInterface;
    getGlassModel(): Model3DInterface;
    setBlockId(x: number, y: number, z: number, blockId: BlockID): void;
    getFacingBlockId(x: number, y: number, z: number, dir?: number): BlockID;
    getX(): number;
    getZ(): number;
    getBlockId(x: number, y: number, z: number): BlockID;
    getBlocks(): Map<string, BlockInterface>;
    isOutOfBounds(x: number, y: number, z: number): boolean;
}