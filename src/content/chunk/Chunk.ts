import StoreClass from '../../core/storage/StoreClass';
import ChunkInterface from './ChunkInterface';
import BlockID from '../../data/block-id';
import { ChunkFaces } from '../../data/chunk-faces';
import ModelInterface from '../../core/scene/model/ModelInterface';
import ChunkModel, { ChunkModelType } from './model/ChunkModel';
import Container, { ServiceName } from '../../core/container/Container';
import BlockInterface from './BlockInterface';

export interface ChunkRawInterface {
    id: string;
    blocks: Map<string, BlockInterface>;
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
    private blocks: Map<string, BlockInterface>;
    private worldX: number;
    private worldZ: number;

    private solidModel!: ModelInterface;
    private glassModel!: ModelInterface;

    constructor(chunkX: number, chunkZ: number, blocks = Chunk.getEmptyBlocks()) {
        const id = Chunk.getId(chunkX, chunkZ);

        super(id, Chunk.STORAGE_FIELDS);

        this.id = id;
        this.blocks = blocks;
        this.worldX = chunkX * Chunk.WIDTH;
        this.worldZ = chunkZ * Chunk.LENGTH;
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

    public getBlockId(x: number, y: number, z: number) {
        const block = this.blocks.get(Chunk.getBlockPosition(x, y, z));

        return block ? block.id : BlockID.AIR;
    }

    public setBlockId(x: number, y: number, z: number, newId: BlockID) {
        const position = Chunk.getBlockPosition(x, y, z),
              currentBlock = this.blocks.get(position) ?? { id: BlockID.AIR };

        const newBlock = {
            id: newId,
        };

        this.blocks.set(position, newBlock);

        this.updateModel(newBlock.id, currentBlock.id);
        Container.getService(ServiceName.WORLD).saveChunk(this);
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

    public buildModel() {
        this.rebuildSolidModel();
        this.rebuildGlassModel();
    }

    private rebuildSolidModel() {
        this.solidModel = ChunkModel.create(this, ChunkModelType.SOLID);
    }

    private rebuildGlassModel() {
        this.glassModel = ChunkModel.create(this, ChunkModelType.GLASS);
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

    // @ts-ignore
    private updateModel(newId: BlockID, previousId: BlockID) {
        // ToDo: Get shader of both ids and rebuild accordingly

        if (newId === BlockID.GLASS) {
            this.rebuildGlassModel();
        } if (newId === BlockID.AIR) {
            this.rebuildGlassModel();
            this.rebuildSolidModel();
        } else {
            this.rebuildSolidModel();
        }
    }

    static getBlockPosition(x: number, y: number, z: number) {
        return `${x}:${y}:${z}`;
    }
}