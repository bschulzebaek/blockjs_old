import BlockID from '../../data/block-id';
import { ChunkFaces } from '../../data/chunk-faces';
import BlockInterface from '../../world-thread/chunk/BlockInterface';

export default class SceneChunk  {
    static WIDTH = 16;
    static LENGTH = 16;
    static HEIGHT = 64;

    private readonly id: string;
    private readonly blocks: Map<string, BlockInterface>;
    private readonly worldX: number;
    private readonly worldZ: number;

    constructor(chunkX: string, chunkZ: string, blocks: Map<string, BlockInterface>) {
        this.id = SceneChunk.getId(chunkX, chunkZ);
        this.blocks = blocks;
        this.worldX = parseInt(chunkX) * SceneChunk.WIDTH;
        this.worldZ = parseInt(chunkZ) * SceneChunk.LENGTH;
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
        const block = this.blocks.get(SceneChunk.getBlockPosition(x, y, z));

        return block ? block.id : BlockID.AIR;
    }

    public setBlockId(x: number, y: number, z: number, newId: BlockID) {
        const position = SceneChunk.getBlockPosition(x, y, z);

        const newBlock = {
            id: newId,
        };

        this.blocks.set(position, newBlock);
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
            x > SceneChunk.WIDTH - 1 ||
            y < 0 ||
            y > SceneChunk.HEIGHT - 1 ||
            z < 0 ||
            z > SceneChunk.LENGTH - 1
        );
    }

    static getFormattedId(x: number, z: number): string {
        const chunkX = Math.floor(x / SceneChunk.WIDTH),
            chunkZ = Math.floor(z / SceneChunk.LENGTH);

        return `${chunkX}:${chunkZ}`;
    }

    static getId(x: string, z: string): string {
        return `${x}:${z}`;
    }

    static getBlockPosition(x: number, y: number, z: number) {
        return `${x}:${y}:${z}`;
    }
}