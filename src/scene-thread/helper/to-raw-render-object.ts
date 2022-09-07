import SceneObjectInterface from '../SceneObjectInterface';
import RawRenderObjectInterface from '../../render-thread/render-object/RawRenderObjectInterface';

export default function toRawRenderObject(sceneObject: SceneObjectInterface): RawRenderObjectInterface | undefined {
    const model = sceneObject.model!;

    if (!model) {
        return;
    }

    return {
        id: sceneObject.getId(),
        shader: sceneObject.getShader(),
        view: new Float32Array(model.view!),
        indices: model.mesh.indices,
        vertices: model.mesh.vertices,
        normals: model.mesh.normals,
        uvs: model.mesh.uvs,
        faces: model.mesh.faces,
        arrayObj: model.mesh.arrayObj,
    }
}