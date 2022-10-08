import { assert, describe, expect, it } from 'vitest';
import Chunk, { ChunkRawInterface } from '../../../src/components/chunk/Chunk';
import { Vector3 } from '../../../src/shared/math';
import { iterateChunk3D } from '../../../src/components/world/utility/iterate-chunk-coords';
import BlockID from '../../../src/data/block-id';
import BlockInterface from '../../../src/components/chunk/BlockInterface';
import { ChunkFaces } from '../../../src/data/chunk-faces';
import generateSeed from '../../../src/shared/utility/generate-seed';

function getRandomBlocks(): Map<string, BlockInterface> {
    const map = new Map();
    const enumEntries = Object.values(BlockID);
    const blockIds = enumEntries.splice(enumEntries.length / 2 + 1, enumEntries.length);

    iterateChunk3D((x: number, y: number, z: number) => {
        map.set(`${x}:${y}:${z}`, { id: blockIds[Math.floor(Math.random() * (blockIds.length - 1))] });
    });

    return map;
}

function getRandomPosition() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const z = Math.floor(Math.random() * 10);

    return new Vector3(x, y, z);
}

describe('Chunk', () => {
    it('is instantiated at provided position and default empty blocks Map', () => {
        const position = getRandomPosition();

        const chunk = new Chunk(position.x, position.z);

        assert.equal(Chunk.worldToId(position.x, position.z), chunk.getId());
        assert.equal(chunk.getBlocks().size, 0);
    });

    it('getBlockIds > returns all BlockIDs as an array', () => {
        const chunk = new Chunk(0, 0, getRandomBlocks());
        const blockIds = chunk.getBlockIds();

        assert.isArray(blockIds);
        assert.equal(blockIds.length, Chunk.WIDTH * Chunk.LENGTH * Chunk.HEIGHT);
    });

    it('getBlockId > returns BlockID at specified position', () => {
        const blockMap = getRandomBlocks();
        const chunk = new Chunk(0, 0, blockMap);
        const {  x, y, z } = getRandomPosition();
        const block = blockMap.get(Chunk.getBlockPosition(x, y, z))!;

        const received = chunk.getBlockId(x, y, z);

        expect(received).toEqual(block.id);
    });

    it('getBlock > returns (BlockInterface) at specified position', () => {
        const blockMap = getRandomBlocks();
        const chunk = new Chunk(0, 0, blockMap);
        const {  x, y, z } = getRandomPosition();
        const block = blockMap.get(Chunk.getBlockPosition(x, y, z))!;

        const received = chunk.getBlock(x, y, z)!;

        expect(received).toBeDefined();
        expect(received.id).toEqual(block.id);
    });

    it('setBlockId > sets the BlockID at specified position and updates "changed" flag', () => {
        const { x, y, z } = getRandomPosition();
        const blockMap = getRandomBlocks();
        const blockMapKey = Chunk.getBlockPosition(x, y, z);

        blockMap.set(blockMapKey, { id: BlockID.OUT_OF_CHUNK });

        const chunk = new Chunk(0, 0, blockMap);

        expect(chunk.getBlockId(x, y, z)).toEqual(BlockID.OUT_OF_CHUNK);
        expect(chunk.getChanged()).toBeFalsy();

        chunk.setBlockId(x, y, z, BlockID.STONE);

        expect(chunk.getBlockId(x, y, z)).toEqual(BlockID.STONE);
        expect(chunk.getChanged()).toBeTruthy();
    });

    it('getFacingBlockId > returns facing BlockID at specified position and direction', () => {
        const chunk = new Chunk(0, 0);
        const { x, y, z } = getRandomPosition();

        const blockId = chunk.getFacingBlockId(x, y, z, Math.floor(Math.random() * 5));

        assert.equal(blockId, BlockID.AIR);
    });

    it('getFacingBlockId > throws an error for invalid direction argument', () => {
        const chunk = new Chunk(0, 0);
        const { x, y, z } = getRandomPosition();

        const inputA = -1;
        const inputB = ChunkFaces.length + 1;

        expect(() => chunk.getFacingBlockId(x, y, z, inputA)).toThrow(
            `Invalid value for parameter dir! ${inputA} given, expected value in range of 0 and ${ChunkFaces.length}.`
        );

        expect(() => chunk.getFacingBlockId(x, y, z, inputB)).toThrow(
            `Invalid value for parameter dir! ${inputB} given, expected value in range of 0 and ${ChunkFaces.length}.`
        );
    });

    it('getFacingBlockIds > returns an array containing all facing BlockIDs', () => {
        const chunk = new Chunk(0, 0);
        const { x, y, z } = getRandomPosition();
        const facingIds = chunk.getFacingBlockIds(x, y, z);
        const expected = [0, 0, 0, 0, 0, 0];

        assert.equal(facingIds.length, expected.length);
        assert.deepEqual(facingIds, expected);
    });

    it('createFromRaw > creates a new instance from a (ChunkRawInterface)', () => {
        const x = Math.floor(Math.random() * 10);
        const z = Math.floor(Math.random() * 10);
        const id = Chunk.worldToId(x, z);
        const blocks = getRandomBlocks();

        const raw: ChunkRawInterface = {
            id,
            x,
            z,
            blocks,
        };

        const chunk = Chunk.createFromRaw(raw);

        assert.equal(chunk.getId(), id);
        assert.equal(chunk.getWorldX(), x);
        assert.equal(chunk.getWorldZ(), z);
        assert.deepEqual(chunk.getBlocks(), blocks);
    });

    it('getRaw > creates a (ChunkRawInterface) based on a chunk instance', () => {
        const x = Math.floor(Math.random() * 10);
        const z = Math.floor(Math.random() * 10);
        const blocks = getRandomBlocks();
        const chunk = new Chunk(x, z, blocks);

        const raw = chunk.getRaw();

        assert.equal(chunk.getId(), raw.id);
        assert.equal(chunk.getWorldX(), raw.x);
        assert.equal(chunk.getWorldZ(), raw.z);
        assert.deepEqual(chunk.getBlocks(), raw.blocks);
    });

    it('worldToId > turns x and z coordinates into an id string', () => {
        const x = Math.floor(Math.random() * 10);
        const z = Math.floor(Math.random() * 10);
        const id = `${x}:${z}`;

        assert.equal(Chunk.worldToId(x, z), id);
    });

    it('blockToId > turns x and z coordinates into an id string', () => {
        const x = Math.floor(Math.random() * 10 * Chunk.WIDTH);
        const z = Math.floor(Math.random() * 10 * Chunk.LENGTH);
        const id = `${Math.floor(x / Chunk.WIDTH)}:${Math.floor(z / Chunk.WIDTH)}`;

        assert.equal(Chunk.blockToId(x, z), id);
    });

    it('blockToChunkPosition > turns block position (absolute 3d position) into a chunk position (2d world grid)', () => {
        const blockPosition = getRandomPosition();
        const chunkPosition = Chunk.blockToChunkPosition(blockPosition);

        assert.equal(chunkPosition.x, Math.floor(blockPosition.x / Chunk.WIDTH));
        assert.equal(chunkPosition.y, 0);
        assert.equal(chunkPosition.z, Math.floor(blockPosition.z / Chunk.LENGTH));
    });

    it('generate > returns a new Chunk instance with block content', () => {
        const x = Math.floor(Math.random() * 10);
        const z = Math.floor(Math.random() * 10);
        const id = `${x}:${z}`;

        const chunk = Chunk.generate(id, generateSeed());

        assert.equal(chunk.getId(), id);
        assert.equal(chunk.getBlocks().size, Chunk.WIDTH * Chunk.LENGTH * Chunk.HEIGHT);
    });

    it('convertToAbsoluteBlockPosition > ', () => {
        const blockPositionInChunk = getRandomPosition();
        const x = Math.floor(Math.random() * 10);
        const z = Math.floor(Math.random() * 10);
        const chunk = new Chunk(x, z);


        const blockPositionInWorld = chunk.convertToAbsoluteBlockPosition(blockPositionInChunk);

        assert.equal(blockPositionInWorld.x, blockPositionInChunk.x + chunk.getWorldX() * Chunk.WIDTH);
        assert.equal(blockPositionInWorld.y, blockPositionInChunk.y);
        assert.equal(blockPositionInWorld.z, blockPositionInChunk.z + chunk.getWorldZ() * Chunk.LENGTH);
    });

    it('getBlockPosition > throws an exception in strict mode, if coordinates are invalid', () => {
        const { x, y, z } = getRandomPosition();

        assert.equal(Chunk.getBlockPosition(x, y, z), `${x}:${y}:${z}`);

        expect(() => Chunk.getBlockPosition(-1, y, z, true)).toThrowError(
            `The provided coordinates "${-1}:${y}:${z}" are out of bounds!"`
        );
        expect(() => Chunk.getBlockPosition(Chunk.WIDTH, y, z, true)).toThrowError(
            `The provided coordinates "${Chunk.WIDTH}:${y}:${z}" are out of bounds!"`
        );

        expect(() => Chunk.getBlockPosition(x, -1, z, true)).toThrowError(
            `The provided coordinates "${x}:${-1}:${z}" are out of bounds!"`
        );
        expect(() => Chunk.getBlockPosition(x, Chunk.HEIGHT, z, true)).toThrowError(
            `The provided coordinates "${x}:${Chunk.HEIGHT}:${z}" are out of bounds!"`
        );

        expect(() => Chunk.getBlockPosition(x, y, -1, true)).toThrowError(
            `The provided coordinates "${x}:${y}:${-1}" are out of bounds!"`
        );
        expect(() => Chunk.getBlockPosition(x, y, Chunk.LENGTH, true)).toThrowError(
            `The provided coordinates "${x}:${y}:${Chunk.LENGTH}" are out of bounds!"`
        );
    });
});