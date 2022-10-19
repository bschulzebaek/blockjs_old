import Message from '../../../shared/utility/Message';
import WorldSubContainer from '../sub-thread/WorldSubContainer';
import RawRenderObjectInterface from '../../../framework/shader/RawRenderObjectInterface';
import { RenderPipelineMessages } from '../../../shared/messages/ThreadMessages';

interface ChunkModels {
    glass: RawRenderObjectInterface;
    solid: RawRenderObjectInterface;
}

export default function pushToRenderPipeline(id: string, models: ChunkModels) {
    const port = WorldSubContainer.getRenderPort();

    const { glass, solid } = models;

    pushChunkModel(port, id, glass);
    pushChunkModel(port, id, solid);
}

function pushChunkModel(port: MessagePort, id: string, model: RawRenderObjectInterface) {
    const transferablePayload = {
        id: model.id,
        shader: model.shader,
        view: new Float32Array(model.view),
        indices: new Uint16Array(model.indices),
        vertices: new Float32Array(model.vertices),
        normals: new Float32Array(model.normals),
        uvs: new Float32Array(model.uvs),
        faces: new Float32Array(model.faces),
        arrayObj: new Float32Array(model.arrayObj),
    };

    Message.send(RenderPipelineMessages.UPSERT_RENDER_OBJECT, {
        id,
        payload: transferablePayload,
    }, port, [
        transferablePayload.view.buffer,
        transferablePayload.indices.buffer,
        transferablePayload.vertices.buffer,
        transferablePayload.normals.buffer,
        transferablePayload.uvs.buffer,
        transferablePayload.faces.buffer,
        transferablePayload.arrayObj.buffer,
    ]);
}