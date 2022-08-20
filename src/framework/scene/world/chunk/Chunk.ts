import StoreClass from '../../../storage/StoreClass';
import ChunkInterface from './ChunkInterface';

import BlockID from '../../../data/block-id';
import { ChunkFaces } from '../../../data/chunk-faces';
import ModelInterface from '../../model/ModelInterface';
import ChunkModel, { ChunkModelType } from '../../model/ChunkModel/ChunkModel';

export interface ChunkRawInterface {
    id: string;
    blocks: number[];
    x: number;
    z: number;
}

export default class Chunk extends StoreClass implements ChunkInterface {
    static STORAGE_FIELDS = [
        'id',
        'blocks',
        'x',
        'z',
    ];
    static WIDTH = 16;
    static LENGTH = 16;
    static HEIGHT = 64;

    private id: string;
    private blocks: BlockID[];
    private x: number;
    private z: number;

    private voxelShaderModel!: ModelInterface;
    private glassShaderModel!: ModelInterface;

    constructor(relativeX: number, relativeZ: number, blocks: BlockID[] = Chunk.getEmptyBlocks()) {
        const id = Chunk.getId(relativeX, relativeZ);

        super(id, Chunk.STORAGE_FIELDS);

        this.id = id;
        this.blocks = blocks;
        this.x = relativeX * Chunk.WIDTH;
        this.z = relativeZ * Chunk.LENGTH;

        this.rebuildModel();
    }

    public getX() {
        return this.x;
    }

    public getZ() {
        return this.z;
    }

    public getId() {
        return this.id;
    }

    public getBlocks() {
        return this.blocks;
    }

    public getBlock(index: number) {
        return this.blocks[index];
    }

    public setBlockId(x: number, y: number, z: number, blockId: BlockID) {
        const currentBlockId = this.getBlockId(x, y, z);
        this.blocks[this.getBlockIndex(x, y, z)] = blockId;

        // TODO: Add a proper map for BlockID -> Shader assignment
        [ currentBlockId, blockId, ...this.getFacingBlockIds(x, y, z) ].forEach((blockId: BlockID) => {
            switch (blockId) {
                case BlockID.GLASS:
                    this.rebuildGlassModel();
                default:
                    this.rebuildSolidModel();
            }
        });
    }

    public getBlockId(x: number, y: number, z: number, dir: number = -1): BlockID {
        if (dir !== -1) {
            const n = ChunkFaces[dir].n;

            x += n[0];
            y += n[1];
            z += n[2];
        }

        if (this.isOutOfBounds(x, y, z)) {
            return BlockID.AIR;
        }

        return this.blocks[this.getBlockIndex(x, y, z)];
    }

    public getFacingBlockIds(x: number, y: number, z: number): number[] {
        let facing = [];

        facing.push(this.getBlockId(x, y - 1, z));
        facing.push(this.getBlockId(x, y + 1, z));
        facing.push(this.getBlockId(x - 1, y, z));
        facing.push(this.getBlockId(x + 1, y, z));
        facing.push(this.getBlockId(x, y, z - 1));
        facing.push(this.getBlockId(x, y, z + 1));

        return facing;
    }

    private getBlockIndex(x: number, y: number, z: number): number {
        return x + z * Chunk.WIDTH * y * Chunk.WIDTH * Chunk.LENGTH;
    }

    public isOutOfBounds(x: number, y: number, z: number): boolean {
        return (
            x < 0 ||
            x > Chunk.WIDTH - 1 ||
            y < 0 ||
            y > Chunk.HEIGHT - 1 ||
            z < 0 ||
            z > Chunk.LENGTH - 1
        );
    }

    public getGlassModel(): ModelInterface {
        return this.glassShaderModel;
    }

    public getVoxelModel(): ModelInterface {
        return this.voxelShaderModel;
    }

    public rebuildModel(): void {
        this.rebuildSolidModel();
        this.rebuildGlassModel();
    }

    private async rebuildSolidModel(): Promise<void> {
        this.voxelShaderModel = ChunkModel.buildModel(this, ChunkModelType.SOLID);
    }

    private async rebuildGlassModel(): Promise<void> {
        this.glassShaderModel = ChunkModel.buildModel(this, ChunkModelType.GLASS);
    }

    static createFromRaw(raw: ChunkRawInterface) {
        return new Chunk(raw.x, raw.z, raw.blocks);
    }

    static getId(x: number, z: number): string {
        return `${x}:${z}`;
    }

    static getEmptyBlocks(): BlockID.AIR[] {
        return Array(Chunk.HEIGHT * Chunk.WIDTH * Chunk.LENGTH).fill(BlockID.AIR);
    }
}