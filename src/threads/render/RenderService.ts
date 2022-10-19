import RenderContainer from './RenderContainer';
import RawRenderObjectInterface from '../../framework/shader/RawRenderObjectInterface';
import RenderObject from '../../framework/shader/RenderObject';

export interface CameraPayload {
    view: Float32Array;
    projection: Float32Array;
}

export interface RenderObjectData {
    id: string;
    payload?: RawRenderObjectInterface|CameraPayload;
}

export default class RenderService {

    public upsert(data: RenderObjectData) {
        if (!data.payload) {
            throw new Error('RenderObject payload is undefined!');
        }

        this.createRONonBlocking(data.payload as RawRenderObjectInterface);
    }

    public upsertChunk(data: RenderObjectData) {
        if (!data.payload) {
            throw new Error('RenderObject payload is undefined!');
        }

        this.createRONonBlocking(data.payload as RawRenderObjectInterface);
    }

    public delete(data: RenderObjectData) {
        RenderContainer.getRenderer().renderObjects.delete(data.id);
    }

    public syncCamera(data: CameraPayload) {
        RenderContainer.getRenderer().syncCamera(data);
    }

    private createRONonBlocking(payload: RawRenderObjectInterface) {
        setTimeout(() => {
            new RenderObject(
                RenderContainer.getRenderer().getContext(),
                payload as RawRenderObjectInterface
            );
        });
    }
}