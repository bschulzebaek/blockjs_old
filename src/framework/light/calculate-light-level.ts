import SceneContainer from '../../threads/scene/SceneContainer';
import BlockInterface from '../../components/chunk/BlockInterface';
import BlockID from '../../data/block-id';
import LightLevel from './LightLevel';
import Chunk from '../../components/chunk/Chunk';
import { Vector3 } from '../../shared/math';

function getAdjacentBlocks(x: number, y: number, z: number) {
    const world = SceneContainer.getWorld();

    let adjacent = [];

    adjacent.push(world.getBlock(x, y - 1, z));
    adjacent.push(world.getBlock(x, y + 1, z));
    adjacent.push(world.getBlock(x - 1, y, z));
    adjacent.push(world.getBlock(x + 1, y, z));
    adjacent.push(world.getBlock(x, y, z - 1));
    adjacent.push(world.getBlock(x, y, z + 1));

    return adjacent;
}

function blockAbove(x: number, y: number, z: number) {
    const world = SceneContainer.getWorld();

    while (y < Chunk.HEIGHT) {
        y++;

        if (world.getBlockId(x, y, z) !== BlockID.AIR) {
            return true;
        }

    }

    return false;
}

function blockIsLightSource(blockId: BlockID): [boolean, number] {
    if (blockId === BlockID.TORCH) {
        return [true, LightLevel.L15];
    }

    return [false, LightLevel.L0];
}

function getBlockLightLevel(block: BlockInterface, x: number, y: number, z: number) {
    const [ isLightSource, lightLevel ] = blockIsLightSource(block.id);

    if (isLightSource) {
        return lightLevel;
    }

    if (!blockAbove(x, y, z)) {
        return LightLevel.L15; // ToDo: Day/Night cycle + Weather impact
    }

    const adjacent = getAdjacentBlocks(x, y, z);
    const brightestAdjacent = adjacent.map((block) => (block && block.lightLevel ? block.lightLevel : 0)).sort((a, b) => { return b - a })[0];

    return brightestAdjacent === LightLevel.L0 ? LightLevel.L0 : brightestAdjacent - 1;
}

export default function calculateLightLevel(position: Vector3) {
    const { x, y, z } = position;
    const world = SceneContainer.getWorld();
    const block = world.getBlock(x, y, z);

    if (!block) {
        return;
    }

    block.lightLevel = getBlockLightLevel(block, x, y, z);
}