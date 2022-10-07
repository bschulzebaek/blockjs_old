import WorldConfigInterface from '../../../components/world-config/WorldConfigInterface';
import StorageAdapter from '../../../shared/storage/StorageAdapter';
import EntityRepository from '../../../components/entity/EntityRepository';
import InventoryRepository from '../../../components/inventory/InventoryRepository';
import Entity from '../../../components/entity/Entity';
import Inventory from '../../../components/inventory/Inventory';
import fillDebugInventory from './fill-debug-inventory';
import generateChunk from '../../../components/world/world-generation/generate-chunk';
import Chunk from '../../../components/chunk/Chunk';
import World from '../../../components/world/World';
import { Vector3 } from '../../../shared/math';

import { PLAYER_ENTITY_ID, PLAYER_INVENTORY_ID } from '../../../data/player-data';

export default async function setupInitialData(config: WorldConfigInterface) {
    console.debug('Initial setup ...');
    const start = performance.now();

    await createPlayerInventory(config);
    const world = await getInitialChunk(config);
    await createPlayerEntity(config, world);

    printStats(start);
}

async function createPlayerInventory(config: WorldConfigInterface) {
    const inventoryRepository = new InventoryRepository(new StorageAdapter(config.getId())),
        inventory = new Inventory(PLAYER_INVENTORY_ID);

    fillDebugInventory(inventory);
    await inventoryRepository.write(inventory);
}

async function getInitialChunk(config: WorldConfigInterface) {
    const chunkMap: Map<string, Chunk|undefined> = new Map([['0:0', undefined]]),
        chunkIds = Array.from(chunkMap.keys()),
        seed = config.getSeed();

    chunkIds.forEach((id) => {
        chunkMap.set(id, generateChunk(id, seed));
    });

    return new World(chunkMap as Map<string, Chunk>);
}

async function createPlayerEntity(config: WorldConfigInterface, world: World) {
    const entityRepository = new EntityRepository(new StorageAdapter(config.getId()));
    const entity = new Entity(PLAYER_ENTITY_ID);
    setStartPosition(world, entity);

    await entityRepository.write(entity);
}

function setStartPosition(world: World, entity: Entity) {
    entity.setWorld(world);
    entity.setPosition(new Vector3(Chunk.WIDTH / 2, Chunk.HEIGHT, Chunk.LENGTH / 2));

    const position = entity.getPosition();

    while (entity.canFall()) {
        position.add(0, -1, 0);
    }

    position.add(0, 1, 0);
}

function printStats(start: number) {
    const delta = (performance.now() - start).toFixed(0)

    console.debug(`Done! - ${delta}ms`);
}