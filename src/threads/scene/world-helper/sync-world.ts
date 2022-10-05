import ChunkModel, { ChunkModelType } from '../../../components/chunk/model/ChunkModel';
import SceneContainer from '../SceneContainer';
import syncRenderObject, { SyncAction } from '../helper/sync-render-object';

const registry: Record<string, any> = {}

enum ChunkSuffix {
    GLASS = '-glass',
    SOLID = '-solid',
}

export default function syncWorld(upsertIds: string[] = [], deleteIds: string[] = []) {
    deleteIds.forEach((id) => {
        syncRenderObject(
            SyncAction.DELETE,
            `${id}${ChunkSuffix.GLASS}`,
        );

        syncRenderObject(
            SyncAction.DELETE,
            `${id}${ChunkSuffix.SOLID}`,
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
            registry[chunkId] = {
                solid: ChunkModel.create(chunk, ChunkModelType.SOLID).toRawRenderObject(),
                glass: ChunkModel.create(chunk, ChunkModelType.GLASS).toRawRenderObject(),
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
