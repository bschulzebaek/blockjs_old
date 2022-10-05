import RenderPipelineContainer from './RenderPipelineContainer';
import { RenderMessages } from '../../shared/messages/ThreadMessages';
import { CameraPayload, RenderObjectData } from '../render/RenderService';
import RawRenderObjectInterface from '../../framework/shader/RawRenderObjectInterface';
import { CAMERA_ID } from '../../data/scene-data';
import Message from '../../shared/utility/Message';
import arrayEquals from '../../shared/utility/array-equals';

class RenderPipelineService {
    private upsertRegistry: Map<string, RawRenderObjectInterface> = new Map();

    public upsert(data: RenderObjectData) {
        if (data.id === CAMERA_ID) {
            return this.syncCamera(data.payload as CameraPayload);
        }

        if (!this.hasChanges(data as { id: string, payload: RawRenderObjectInterface})) {
            return;
        }

        this.upsertRegistry.set(data.id, data.payload as RawRenderObjectInterface);

        Message.send(
            RenderMessages.UPSERT_RENDER_OBJECT,
            data,
            RenderPipelineContainer.getRenderPort(),
        );
    }

    public delete(data: RenderObjectData) {
        this.upsertRegistry.delete(data.id);

        Message.send(
            RenderMessages.DELETE_RENDER_OBJECT,
            data,
            RenderPipelineContainer.getRenderPort(),
        );
    }

    private syncCamera(data: CameraPayload) {
        Message.send(
            RenderMessages.SYNC_CAMERA,
            data,
            RenderPipelineContainer.getRenderPort(),
            [ data.view.buffer, data.projection.buffer ],
        );
    }

    private hasChanges({ id, payload }: { id: string, payload: RawRenderObjectInterface}) {
        if (!this.upsertRegistry.has(id)) {
            this.upsertRegistry.set(id, payload);

            return true;
        }

        const { view, indices, vertices, normals, uvs, faces, arrayObj } = payload;
        const last = this.upsertRegistry.get(id)!;

        return (
            !arrayEquals(view, last.view) ||
            !arrayEquals(indices, last.indices) ||
            !arrayEquals(vertices, last.vertices) ||
            !arrayEquals(normals, last.normals) ||
            !arrayEquals(uvs, last.uvs) ||
            !arrayEquals(faces, last.faces) ||
            !arrayEquals(arrayObj, last.arrayObj)
        );
    }
}

export default new RenderPipelineService()