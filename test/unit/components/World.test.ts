import { assert, describe, expect, it, vi } from 'vitest';
import World from '../../../src/components/world/World';
import Chunk from '../../../src/components/chunk/Chunk';
import BlockID from '../../../src/data/block-id';
import { Vector3 } from '../../../src/shared/math';
import BlockUpdatedEvent from '../../../src/components/world/events/BlockUpdatedEvent';

function createMapWithRandomSize(max: number, addChunks: boolean) {
    return World.createChunkMap(Math.ceil(Math.random() * max), 0, 0, addChunks) as Map<string, Chunk>;
}

function getRandomChunkFromMap(map: Map<string, Chunk>) {
    const index = Math.floor(Math.random() * (map.size - 1));

    return Array.from(map.values())[index];
}

function getRandomBlockPositionInChunk() {
    const x = Math.floor(Math.random() * (Chunk.WIDTH - 1));
    const y = Math.floor(Math.random() * (Chunk.HEIGHT - 1));
    const z = Math.floor(Math.random() * (Chunk.LENGTH - 1));

    return new Vector3(x, y, z);
}

describe('World', () => {
    it('is instantiated with default empty map', () => {
        const world = new World();

        const worldMap = world.getMap();

        expect(worldMap).toBeDefined();
        expect(worldMap.size).toStrictEqual(0);
    });

    it('takes a chunkMap as constructor argument', () => {
        const map = createMapWithRandomSize(10, false);
        const world = new World(map);

        const worldMap = world.getMap();

        expect(worldMap).toBeDefined();
        expect(worldMap.size).toStrictEqual(map.size);
    });

    it('chunkExists > checks for chunk existence by x and z coordinates', () => {
        const world = new World();
        const chunk = new Chunk(5, -3);

        assert.isFalse(world.chunkExists(chunk.getId()));

        world.pushChunk(chunk);

        assert.isTrue(world.chunkExists(chunk.getId()));
    });

    it('getChunkIds > returns an array of strings containing all Chunk ids', () => {
        const map = createMapWithRandomSize(10, false);
        const expectedIds = Array.from(map.keys()).sort();
        const world = new World(map);
        const ids = world.getChunkIds().sort();

        expect(ids).toStrictEqual(expectedIds);
    });

    it('getChunkById, getChunkByBlockPosition, getChunkByWorldPosition > returns requested chunks', () => {
        const map = World.createChunkMap(Math.ceil(Math.random() * 10), 0, 0, true) as Map<string, Chunk>;
        const world = new World(map);
        const chunk = getRandomChunkFromMap(map);
        const expectedId = chunk.getId();

        const receivedById = world.getChunkById(expectedId)!;

        assert.exists(receivedById);
        assert.strictEqual(receivedById.getId(), expectedId);

        const receivedByBlock = world.getChunkByBlockPosition(chunk.getBlockX(), chunk.getBlockZ())!;

        assert.exists(receivedByBlock);
        assert.strictEqual(receivedByBlock.getId(), expectedId);

        const receivedByWorld = world.getChunkByWorldPosition(chunk.getWorldX(), chunk.getWorldZ())!;

        assert.exists(receivedByWorld);
        assert.strictEqual(receivedByWorld.getId(), expectedId);
    });

    it('getChunkById > strict mode throws an exception, if chunk does not exist', () => {
        const map = World.createChunkMap(1) as Map<string, Chunk>;
        const world = new World(map);

        expect(() => world.getChunkByWorldPosition(0, 0, true)).toThrowError(
            'Chunk with id "0:0" does not exist!'
        );
    });

    it('popChunk > deletes the specified chunk from the map and returns it', () => {
        const map = World.createChunkMap(3, 0, 0, true) as Map<string, Chunk>;
        const world = new World(map);

        const id = '0:0';

        assert.isTrue(world.chunkExists(id));

        const chunk = world.popChunk(id);

        assert.isFalse(world.chunkExists(id));
        assert.exists(chunk);
        assert.strictEqual(chunk.getId(), id);
    });

    it('getBlock, getBlockId > returns the block at given position', () => {
        const map = createMapWithRandomSize(5, true);
        const world = new World(map);
        const chunk = getRandomChunkFromMap(map);
        const blockPosition = getRandomBlockPositionInChunk();

        chunk.setBlockId(blockPosition.x, blockPosition.y, blockPosition.z, BlockID.STONE);

        const { x, y, z } = chunk.convertToAbsoluteBlockPosition(blockPosition);

        const block = world.getBlock(x, y, z);
        const blockId = world.getBlockId(x, y, z);

        assert.exists(block);
        assert.exists(blockId);

        assert.strictEqual(blockId, block!.id);
        assert.strictEqual(blockId, BlockID.STONE);
    });

    it('setBlockId > sets the block id in the proper chunk and dispatches the BlockUpdatedEvent', () => {
        const map = createMapWithRandomSize(5, true);
        const world = new World(map);
        const chunk = getRandomChunkFromMap(map);
        const relativePosition = getRandomBlockPositionInChunk();
        const absolutePosition = chunk.convertToAbsoluteBlockPosition(relativePosition);
        const expectedId = BlockID.STONE;

        vi.stubGlobal('dispatchEvent', () => {});

        const spy = vi.spyOn(globalThis, 'dispatchEvent');

        world.setBlockId(absolutePosition.x, absolutePosition.y, absolutePosition.z, expectedId);

        const { x, y, z } = chunk.convertToAbsoluteBlockPosition(relativePosition);

        const block = world.getBlock(x, y, z);
        const blockId = world.getBlockId(x, y, z);

        assert.exists(block);
        assert.exists(blockId);

        assert.strictEqual(blockId, block!.id);
        assert.strictEqual(blockId, expectedId);

        expect(spy).toBeCalled();

        // @ts-ignore
        const event = spy.calls[0][0] as BlockUpdatedEvent;

        const eventPosition = event.getPosition();

        assert.equal(eventPosition.x, absolutePosition.x);
        assert.equal(eventPosition.y, absolutePosition.y);
        assert.equal(eventPosition.z, absolutePosition.z);

        assert.equal(event.getNewId(), expectedId);
    });

    it('setBlockId > throws an exception, if chunk does not exist', () => {
        const world = new World();
        const chunk = new Chunk(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));

        const position = chunk.convertToAbsoluteBlockPosition(getRandomBlockPositionInChunk());

        expect(() => world.setBlockId(position.x, position.y, position.z, 0)).toThrowError(
            `Chunk with id "${chunk.getId()}" does not exist!`
        );
    });

    it('getBlockId > returns "BlockID.OUT_OF_CHUNK" for out of bounds position', () => {
        const world = new World();
        const position = getRandomBlockPositionInChunk();

        assert.equal(world.getBlockId(position.x, position.y, position.z), BlockID.OUT_OF_CHUNK);
    });

    it('getBlock > returns "undefined" for out of bounds position', () => {
        const world = new World();
        const position = getRandomBlockPositionInChunk();

        assert.equal(world.getBlock(position.x, position.y, position.z), undefined);
    });

    it('getChunks > returns all chunks as an array', () => {
        const map = createMapWithRandomSize(10, true);
        const expectedIds = Array.from(map.keys()).sort();
        const world = new World(map);

        const chunks = world.getChunks();

        chunks.forEach((chunk) => {
            assert.include(expectedIds, chunk.getId());
        });
    });
});