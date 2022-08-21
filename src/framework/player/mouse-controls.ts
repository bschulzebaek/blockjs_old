import getBlockFromRay from '../../utility/get-block-from-ray';
import Container, { ServiceName } from '../Container';
import BlockID from '../data/block-id';
import { ChunkFaces } from '../data/chunk-faces';

function printInfo(details: object) {
    console.debug({
        Action: 'Edit block',
        ...details
    });
}

function onLeftClick() {
    const camera = Container.getService(ServiceName.SCENE).getCamera()!;

    const block = getBlockFromRay(camera.transform.position, camera.ray.fromScreen().ray);

    if (!block) {
        return printInfo({ 'Message': 'No target block found!' });
    }

    const world = Container.getService(ServiceName.WORLD).getWorld()!,
          x = block.x,
          y = block.y,
          z = block.z;

    if (!world.chunkExists(x, z)) {
        return printInfo({ Position: `${x}:${y}:${z}`, Message: 'No chunk found at given position!' });
    }

    // if (!Item.has(block.blockId)) {
    //     throw new Error('[Attack] Invalid ItemID!');
    // }

    // const blockInfo = Item.get(block.blockId);

    // if (blockInfo?.hardness && blockInfo.hardness === -1) {
    //     return printInfo({ Position: `${x}:${y}:${z}`, Message: 'Block cant be removed!' });
    // }

    if (block.blockId === BlockID.BEDROCK) {
        return printInfo({ Position: `${x}:${y}:${z}`, Message: 'Block cant be removed!' });
    }

    world.setBlockId(x, y, z, BlockID.AIR);;

    printInfo({ Position: `${x}:${y}:${z}`, 'New Block ID': 0 });
}

function onRightClick() {
    const sceneService = Container.getService(ServiceName.SCENE),
          worldService = Container.getService(ServiceName.WORLD),
          camera       = sceneService.getCamera()!,
          world        = worldService.getWorld()!,
          player       = sceneService.getController()!;

    const block = getBlockFromRay(camera.transform.position, camera.ray.fromScreen().ray);

    if (!block) {
        return printInfo({ 'Message': 'No target block found!' });
    }

    const n = ChunkFaces[block.face].n,
          x = block.x + n[0],
          y = block.y + n[1],
          z = block.z + n[2];

    if (!world.chunkExists(x, z)) {
        return printInfo({ Position: `${x}:${y}:${z}`, Message: 'No chunk found at given position!' });
    }

    if (player.isBlocking(x, y, z)) {
        return printInfo({ Position: `${x}:${y}:${z}`, Message: 'Position blocked by player!' });
    }

    world.setBlockId(x, y, z, BlockID.SANDSTONE);

    printInfo({ Position: `${x}:${y}:${z}`, 'New Block ID': BlockID.SANDSTONE });
}

export {
    onLeftClick,
    onRightClick,
}