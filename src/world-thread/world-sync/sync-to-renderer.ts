import WorldContainer from '../WorldContainer';
import { RenderMessages } from '../../shared/messages/ThreadMessages';
import Message from '../../shared/utility/Message';
import ChunkModel, { ChunkModelType } from '../chunk/model/ChunkModel';
import ModelInterface from '../../scene-thread/model/ModelInterface';

const registry: Record<string, any> = {}

export default function syncToRenderer(newChunks: string[] = [], removeChunks: string[] = []) {
    Message.send(
        RenderMessages.POP_CHUNKS,
        removeChunks,
        WorldContainer.getRenderPort(),
    );

    if (!newChunks.length) {
        newChunks = WorldContainer.getWorld().getChunkIds();
    }

    sortChunksByDistance(newChunks).forEach(syncChunk);
}

function sortChunksByDistance(chunkIds: string[]) {
    let sorted: string[] = [];

    while (chunkIds.length) {
        sorted.push(
            ...chunkIds.splice(
                Math.floor(chunkIds.length / 2),
                1
            )
        );
    }

    return sorted;
}

function syncChunk(chunkId: string) {
    const world            = WorldContainer.getWorld(),
          chunk            = world.getChunkById(chunkId)!,
          changedBlocks    = chunk.getChangedBlockIDs();

    if (changedBlocks.size || !registry[chunkId]) {
        const solid = ChunkModel.create(chunk, ChunkModelType.SOLID),
              glass = ChunkModel.create(chunk, ChunkModelType.GLASS);

        registry[chunkId] = {
            id: chunkId,
        };

        registry[chunkId].solid = {
            shader: 'chunk-solid',
            ...getModelData(solid),
        };


        registry[chunkId].glass = {
            shader: 'chunk-glass',
            ...getModelData(glass),
        };
    }

    changedBlocks.clear();

    Message.send(
        RenderMessages.SYNC_CHUNK,
        registry[chunkId],
        WorldContainer.getRenderPort()
    );
}

function getModelData(model: ModelInterface) {
    return {
        view: new Float32Array(model.view!),
        indices: model.mesh.indices,
        vertices: model.mesh.vertices,
        // normals: model.mesh.normals,
        uvs: model.mesh.uvs,
        faces: model.mesh.faces,
        arrayObj: model.mesh.arrayObj,
    }
}