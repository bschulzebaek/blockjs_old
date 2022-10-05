import syncWorld from './sync-world';
import SceneContainer from '../SceneContainer';

export default async function unloadChunks(ids: string[]) {
    const world = SceneContainer.getWorld();

    ids.forEach((id) => {
        world.popChunk(id);

        syncWorld([], [ id ]);
    });
}