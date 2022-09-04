import ModelInterface from '../../__old/framework/scene/model/ModelInterface';
import BlockID from '../../__old/data/block-id';
import BlockInterface from './BlockInterface';

export default interface ChunkInterface {
    getSolidModel(): ModelInterface;
    getGlassModel(): ModelInterface;
    setBlockId(x: number, y: number, z: number, blockId: BlockID): void;
    getFacingBlockId(x: number, y: number, z: number, dir?: number): BlockID;
    getX(): number;
    getZ(): number;
    getBlockId(x: number, y: number, z: number): BlockID;
    getBlocks(): Map<string, BlockInterface>;
    isOutOfBounds(x: number, y: number, z: number): boolean;
}