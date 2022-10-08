import { assert, describe, expect, it } from 'vitest';
import World from '@/components/world/World';

describe('World', () => {
    it('is instantiated with default empty map', () => {
        const world = new World();

        expect(world.map).toBeDefined();
        expect(world.map.size).toStrictEqual(0);
    });

    it('takes a chunkMap as argument', () => {
        const map = World.createChunkMap(Math.round(Math.random() * 10));
        const world = new World(map);

        expect(world.map).toBeDefined();
        expect(world.map.size).toStrictEqual(map.size);
    });
});