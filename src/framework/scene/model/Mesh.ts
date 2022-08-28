import Container from '../../container/Container';

enum ATTRIBUTE_LOCATIONS {
    POSITION = 0,
    NORMAL = 1,
    UV = 2
}

export default class Mesh {
    public name: string;
    public drawMode: number;
    public vao: WebGLVertexArrayObject|null = null;
    public indices: WebGLBuffer|null = null;
    public vertices: WebGLBuffer|null = null;
    public normals: WebGLBuffer|null = null;
    public uvs: WebGLBuffer|null = null;
    public faces?: WebGLBuffer;
    public arrayObj?: WebGLBuffer;

    public indexCount = 0;
    public vertexCount = 0;
    public vertexComponentSize = 3;

    public noCulling = true;
    public doBlending = true;
    public transparent = false;

    constructor(name: string, indices: number[], vertices: number[], normals: number[], uvs: number[]) {
        const context = Container.getContext();

        this.name = name;
        this.drawMode = context.TRIANGLES;
        this.vao = context.createVertexArray();

        context.bindVertexArray(this.vao);

        this.bindIndices(context, indices);
        this.bindVertices(context, vertices);
        this.bindNormals(context, normals);
        this.bindUvs(context, uvs);

        context.bindVertexArray(null);
        context.bindBuffer(context.ARRAY_BUFFER, null);

        if (indices) {
            context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, null);
        }
    }

    private bindIndices(context: WebGL2RenderingContext, indices: number[]): void {
        if (!indices) {
            return;
        }

        this.indices = context.createBuffer();
        this.indexCount = indices.length;
        context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.indices);
        context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), context.STATIC_DRAW);

        // context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, null);
    }

    private bindVertices(context: WebGL2RenderingContext, vertices: number[]): void {
        if (!vertices) {
            return;
        }

        this.vertices = context.createBuffer();
        this.vertexComponentSize = 3;
        this.vertexCount = vertices.length / this.vertexComponentSize;
        context.bindBuffer(context.ARRAY_BUFFER, this.vertices);
        context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW);
        context.enableVertexAttribArray(ATTRIBUTE_LOCATIONS.POSITION);
        context.vertexAttribPointer(ATTRIBUTE_LOCATIONS.POSITION, 3, context.FLOAT, false, 0, 0);
    }

    private bindNormals(context: WebGL2RenderingContext, normals: number[]): void {
        if (!normals) {
            return;
        }

        this.normals = context.createBuffer();
        context.bindBuffer(context.ARRAY_BUFFER, this.normals);
        context.bufferData(context.ARRAY_BUFFER, new Float32Array(normals), context.STATIC_DRAW);
        context.enableVertexAttribArray(ATTRIBUTE_LOCATIONS.NORMAL);
        context.vertexAttribPointer(ATTRIBUTE_LOCATIONS.NORMAL, 3, context.FLOAT, false, 0, 0);
    }

    private bindUvs(context: WebGL2RenderingContext, uvs: number[]): void {
        if (!uvs) {
            return;
        }

        this.uvs = context.createBuffer();
        context.bindBuffer(context.ARRAY_BUFFER, this.uvs);
        context.bufferData(context.ARRAY_BUFFER, new Float32Array(uvs), context.STATIC_DRAW);
        context.enableVertexAttribArray(ATTRIBUTE_LOCATIONS.UV);
        context.vertexAttribPointer(ATTRIBUTE_LOCATIONS.UV, 2, context.FLOAT, false, 0, 0);
    }
}