import Model from '../framework/scene/model/Model';
import ChunkInterface from '../framework/scene/world/chunk/ChunkInterface';

export default function buildChunkModel(context: WebGL2RenderingContext, chunk: ChunkInterface): Model {
    const model = new Model();

    return model;
}