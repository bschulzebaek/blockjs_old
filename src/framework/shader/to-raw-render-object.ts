import SceneObjectInterface from '../../threads/scene/scene/SceneObjectInterface';
import RawRenderObjectInterface from './RawRenderObjectInterface';

export default function toRawRenderObject(sceneObject: SceneObjectInterface): RawRenderObjectInterface | undefined {
    const model  = sceneObject.model!,
          shader = sceneObject.getShader();

    if (!model || !shader) {
        return;
    }

    return {
        id: sceneObject.getId(),
        shader,
        view: new Float32Array(model.view!),
        indices: model.mesh.indices,
        vertices: model.mesh.vertices,
        normals: model.mesh.normals,
        uvs: model.mesh.uvs,
        faces: model.mesh.faces,
        arrayObj: model.mesh.arrayObj,
    }
}