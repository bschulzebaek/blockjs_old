export default class RawMesh {
    public name: string;
    public indices: Uint16Array;
    public vertices: Float32Array;
    public normals: Float32Array;
    public uvs: Float32Array;
    public faces: Float32Array;
    public arrayObj: Float32Array;

    constructor(name: string, indices: number[], vertices: number[], normals: number[], uvs: number[], faces: number[] = [], arrayObj: number[] = []) {
        this.name = name;

        this.indices = new Uint16Array(indices);
        this.vertices = new Float32Array(vertices);
        this.normals = new Float32Array(normals);
        this.uvs = new Float32Array(uvs);
        this.faces = new Float32Array(faces);
        this.arrayObj = new Float32Array(arrayObj);
    }
}