import Model3DInterface from './Model3DInterface';
import { Transform } from '../../shared/math';
import Mesh from './Mesh';
import { ShaderName } from '../../framework/shader/shader-names';

export default class Model3D extends Transform implements Model3DInterface {
    private readonly sceneId: string;
    private readonly mesh: Mesh;
    private readonly shader: ShaderName;

    constructor(sceneId: string, mesh: Mesh, shader: ShaderName) {
        super();

        this.sceneId = sceneId;
        this.mesh = mesh;
        this.shader = shader;
    }

    public update(): void {
        this.updateMatrix();
    }

    public toRawRenderObject() {
        const { sceneId, shader, view } = this;
        const { indices, vertices, normals, uvs, faces, arrayObj } = this.mesh;

        return {
            id: sceneId,
            shader,
            view: new Float32Array(view!),
            indices,
            vertices,
            normals,
            uvs,
            faces,
            arrayObj,
        }
    }
}