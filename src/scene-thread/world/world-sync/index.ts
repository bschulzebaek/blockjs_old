import ChunkModel, { ChunkModelType } from '../chunk/model/ChunkModel';
import SceneContainer from '../../SceneContainer';
import ModelInterface from '../../model/ModelInterface';
import syncRenderObject, { SyncAction } from '../../helper/sync-render-object';

const registry: Record<string, any> = {}

export default function worldSync(upsertIds: string[] = [], deleteIds: string[] = []) {
    deleteIds.forEach((id) => {
        syncRenderObject(
            SyncAction.DELETE,
            id,
        );
    });

    sortChunks(upsertIds).forEach(syncChunk);
}

function sortChunks(chunkIds: string[]) {
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
    setTimeout(() => {
        const world = SceneContainer.getWorld(),
              chunk = world.getChunkById(chunkId)!;

        if (!chunk) {
            return;
        }

        const changedBlocks = chunk.getChangedBlockIDs();

        if (changedBlocks.size || !registry[chunkId]) {
            const solid = ChunkModel.create(chunk, ChunkModelType.SOLID),
                  glass = ChunkModel.create(chunk, ChunkModelType.GLASS);

            registry[chunkId] = {
                id: chunkId,
            };

            registry[chunkId].solid = {
                id: `${chunkId}-solid`,
                shader: 'chunk-solid',
                ...getModelData(solid),
            };


            registry[chunkId].glass = {
                id: `${chunkId}-glass`,
                shader: 'chunk-glass',
                ...getModelData(glass),
            };
        }

        changedBlocks.clear();

        syncRenderObject(
            SyncAction.UPSERT,
            chunkId,
            registry[chunkId].solid,
        );

        syncRenderObject(
            SyncAction.UPSERT,
            chunkId,
            registry[chunkId].glass,
        );
    });
}

function getModelData(model: ModelInterface) {
    return {
        view: new Float32Array(model.view!),
        indices: model.mesh.indices,
        vertices: model.mesh.vertices,
        normals: [],
        uvs: model.mesh.uvs,
        faces: model.mesh.faces,
        arrayObj: model.mesh.arrayObj,
    }
}