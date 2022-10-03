import BlockInterface from './BlockInterface';
import BlockID from '../../../data/block-id';
import StoreClass from '../../../shared/storage/StoreClass';
import { ChunkFaces } from '../../../data/chunk-faces';

export interface ChunkRawInterface {
    id: string;
    blocks: Map<string, BlockInterface>;
    worldX: number;
    worldZ: number;
}

export default class Chunk extends StoreClass {
    static STORAGE_IDENTIFIER = 'id';
    static STORAGE_FIELDS = [
        'id',
        'blocks',
        'worldX',
        'worldZ',
    ];
    static WIDTH = 16;
    static LENGTH = 16;
    static HEIGHT = 64;

    private readonly id: string;
    private readonly blocks: Map<string, BlockInterface>;
    private readonly worldX: number;
    private readonly worldZ: number;
    private readonly changedBlockIDs: Set<BlockID> = new Set();
    private changed = false;

    constructor(chunkX: number, chunkZ: number, blocks = Chunk.getEmptyBlocks()) {
        super(Chunk.STORAGE_IDENTIFIER, Chunk.STORAGE_FIELDS);

        this.id = Chunk.getId(chunkX, chunkZ);
        this.blocks = blocks;
        this.worldX = chunkX * Chunk.WIDTH;
        this.worldZ = chunkZ * Chunk.LENGTH;
    }

    public getChangedBlockIDs() {
        return this.changedBlockIDs;
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

    public getChanged() {
        return this.changed;
    }

    public getBlockId(x: number, y: number, z: number) {
        const block = this.blocks.get(Chunk.getBlockPosition(x, y, z));

        return block ? block.id : BlockID.AIR;
    }

    public setBlockId(x: number, y: number, z: number, id: BlockID) {
        const position = Chunk.getBlockPosition(x, y, z);

        this.blocks.set(position, { id });

        this.changedBlockIDs.add(id);
        this.changed = true;
    }

    public getFacingBlockId(x: number, y: number, z: number, dir: number = -1): BlockID {
        if (dir !== -1) {
            const n = ChunkFaces[dir].n;

            x += n[0];
            y += n[1];
            z += n[2];
        }

        return this.getBlockId(x, y, z);
    }

    public getFacingBlockIds(x: number, y: number, z: number): BlockID[] {
        let facing = [];

        facing.push(this.getBlockId(x, y - 1, z));
        facing.push(this.getBlockId(x, y + 1, z));
        facing.push(this.getBlockId(x - 1, y, z));
        facing.push(this.getBlockId(x + 1, y, z));
        facing.push(this.getBlockId(x, y, z - 1));
        facing.push(this.getBlockId(x, y, z + 1));

        return facing;
    }

    static createFromRaw(raw: ChunkRawInterface) {
        const chunkX = Math.floor(raw.worldX / Chunk.WIDTH),
              chunkZ = Math.floor(raw.worldZ / Chunk.LENGTH);

        return new Chunk(chunkX, chunkZ, raw.blocks);
    }

    public getRaw(): ChunkRawInterface {
        return {
            id: this.id,
            worldX: this.worldX,
            worldZ: this.worldZ,
            blocks: this.blocks,
        }
    }

    static getId(x: number, z: number): string {
        return `${x}:${z}`;
    }

    static getFormattedId(x: number, z: number): string {
        const chunkX = Math.floor(x / Chunk.WIDTH),
              chunkZ = Math.floor(z / Chunk.LENGTH);

        return `${chunkX}:${chunkZ}`;
    }

    static getEmptyBlocks(): Map<string, BlockInterface> {
        return new Map();
    }

    static getBlockPosition(x: number, y: number, z: number) {
        return `${x}:${y}:${z}`;
    }
}