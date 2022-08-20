import StoreClass from '../../../storage/StoreClass';
import ChunkInterface from './ChunkInterface';

import BlockID from '../../../data/block-id';
import { ChunkFaces } from '../../../data/chunk-faces';
import ModelInterface from '../../model/ModelInterface';
import ChunkModel, { ChunkModelType } from '../../model/ChunkModel/ChunkModel';

export interface ChunkRawInterface {
    id: string;
    blocks: number[];
    worldX: number;
    worldZ: number;
}

export default class Chunk extends StoreClass implements ChunkInterface {
    static STORAGE_FIELDS = [
        'id',
        'blocks',
        'worldX',
        'worldZ',
    ];
    static WIDTH = 16;
    static LENGTH = 16;
    static HEIGHT = 64;

    private id: string;
    private blocks: BlockID[];
    private worldX: number;
    private worldZ: number;

    private solidModel!: ModelInterface;
    private glassModel!: ModelInterface;

    constructor(chunkX: number, chunkZ: number, blocks: BlockID[] = Chunk.getEmptyBlocks()) {
        const id = Chunk.getId(chunkX, chunkZ);

        super(id, Chunk.STORAGE_FIELDS);

        this.id = id;
        this.blocks = blocks;
        this.worldX = chunkX * Chunk.WIDTH;
        this.worldZ = chunkZ * Chunk.LENGTH;

        this.rebuildSolidModel();
        this.rebuildGlassModel();
    }

    public getX() {
        return this.worldX;
    }

    public getZ() {
        return this.worldZ;
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
        const blockIndex = this.getBlockIndex(x, y, z),
              previousId = this.getBlockId(x, y, z);

        this.blocks[blockIndex] = blockId;

        console.log('[CHUNK] Improve ChunkModel updates!');

        // TODO: Only rebuild faces for changed block !
        // 1) Get index
        // 2) Extract ChunkModel algo from block iteration

        // ChunkModel.replaceBlock(this.glassModel, 'glass', this.getBlockIndex(x, y, z));
        // ChunkModel.replaceBlock(this.solidModel, 'solid', this.getBlockIndex(x, y, z));

        // TODO: Add a proper map for BlockID -> Shader assignment
        [ previousId, blockId, ...this.getFacingBlockIds(x, y, z) ].forEach((blockId: BlockID) => {
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
        return x + (z * Chunk.WIDTH) + (y * Chunk.WIDTH * Chunk.LENGTH);
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
        return this.glassModel;
    }

    public getSolidModel(): ModelInterface {
        return this.solidModel;
    }

    private rebuildSolidModel() {
        this.solidModel = ChunkModel.create(this, ChunkModelType.SOLID);
    }

    private rebuildGlassModel() {
        this.glassModel = ChunkModel.create(this, ChunkModelType.GLASS);
    }

    static createFromRaw(raw: ChunkRawInterface) {
        return new Chunk(raw.worldX, raw.worldZ, raw.blocks);
    }

    static getId(x: number, z: number): string {
        const chunkX = Math.floor(x / Chunk.WIDTH),
              chunkZ = Math.floor(z / Chunk.LENGTH);

        return `${chunkX}:${chunkZ}`;
    }

    static getEmptyBlocks(): BlockID.AIR[] {
        return Array(Chunk.HEIGHT * Chunk.WIDTH * Chunk.LENGTH).fill(BlockID.AIR);
    }
}