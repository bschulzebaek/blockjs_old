import { ShaderName } from '../shader/ShaderRegistry';

export default interface RawRenderObjectInterface {
    id: string;
    shader: ShaderName;
    view: Float32Array;
    indices: Uint16Array;
    vertices: Float32Array;
    normals: Float32Array;
    uvs: Float32Array;
    faces: Float32Array;
    arrayObj: Float32Array;
}