import WorldConfigInterface from '../../../components/world-config/WorldConfigInterface';
import StorageAdapter from '../../../shared/storage/StorageAdapter';
import ChunkRepository from '../../../components/chunk/ChunkRepository';
import EntityRepository from '../../../components/entity/EntityRepository';
import InventoryRepository from '../../../components/inventory/InventoryRepository';
import Entity from '../../../components/entity/Entity';
import Inventory from '../../../components/inventory/Inventory';
import fillDebugInventory from './fill-debug-inventory';
import getChunkMap from '../../../components/world/utility/get-chunk-map';
import generateChunk from '../../../components/world/world-generation/generate-chunk';
import Chunk from '../../../components/chunk/Chunk';
import World from '../../../components/world/World';
import { Vector3 } from '../../../shared/math';

import { PLAYER_ENTITY_ID, PLAYER_INVENTORY_ID } from '../../../data/player-data';
import { VIEW_DISTANCE } from '../../../data/settings';
import { WORLD_SEA_LEVEL } from '../../../components/world/constants';

export default async function createNewWorld(config: WorldConfigInterface) {
    console.debug('Generating new world ...');
    const start = performance.now();

    await createPlayerInventory(config);
    const world = await createInitialWorld(config);
    await createPlayerEntity(config, world);

    printStats(start);
}

async function createPlayerInventory(config: WorldConfigInterface) {
    const inventoryRepository = new InventoryRepository(new StorageAdapter(config.getId())),
          inventory           = new Inventory(PLAYER_INVENTORY_ID);

    fillDebugInventory(inventory);
    await inventoryRepository.write(inventory);
}

async function createInitialWorld(config: WorldConfigInterface) {
    const repository = new ChunkRepository(new StorageAdapter(config.getId())),
        chunkMap   = getChunkMap(VIEW_DISTANCE, 0, 0),
        chunkIds   = Array.from(chunkMap.keys()),
        seed       = config.getSeed();

    chunkIds.forEach((id) => {
        chunkMap.set(id, generateChunk(id, seed));
    });

    await repository.writeList(Array.from(chunkMap.values()) as Chunk[]);

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
    entity.setPosition(new Vector3(0, WORLD_SEA_LEVEL, 0));

    const position = entity.getPosition();

    do {
        position.add(0, 1, 0);
        entity.setPosition(position);
    } while (entity.isBlocked());

    while (entity.canFall()) {
        position.add(0, -1, 0);
        entity.setPosition(position);
    }
}

function printStats(start: number) {
    const delta = (performance.now() - start).toFixed(0)

    console.debug(`Done! - ${delta}ms`);
}