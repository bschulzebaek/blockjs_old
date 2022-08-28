
import buildFaces from './build-faces';
import { getFaceFn, getSkipFn} from './add-face-fn';
import Chunk from '../Chunk';
import Model from '../../../core/scene/model/Model';
import Container from '../../../core/container/Container';
import BlockID from '../../../data/block-id';
import BlockUV from '../../../data/block-model';
import { ChunkFaces } from '../../../data/chunk-faces';
import Mesh from '../../../core/scene/model/Mesh';

export enum ChunkModelType {
    SOLID = 'solid',
    GLASS = 'glass',
}

export default class ChunkModel {

    static create(chunk: Chunk, type: ChunkModelType): Model {
        const faces: number[] = [],
              arrayObject: number[] = [],
              model = new Model(ChunkModel.buildMesh(chunk, getFaceFn(type), getSkipFn(type), [], [], [], [], faces, arrayObject));

        model.position.set(chunk.getX(), 0, chunk.getZ());

        ChunkModel.bindToContext(model, faces, arrayObject);

        model.update();

        return model;
    }

    static bindToContext(model: Model, faces: number[], arrayObject: number[]) {
        const context = Container.getContext();

        context.bindVertexArray(model.mesh.vao);

        model.mesh.faces = context.createBuffer() as WebGLBuffer;
        context.bindBuffer(context.ARRAY_BUFFER, model.mesh.faces);
        context.bufferData(context.ARRAY_BUFFER, new Float32Array(faces), context.STATIC_DRAW);
        context.enableVertexAttribArray(3);
        context.vertexAttribPointer(3, 2, context.FLOAT, false, 0, 0);

        model.mesh.arrayObj = context.createBuffer() as WebGLBuffer;
        context.bindBuffer(context.ARRAY_BUFFER, model.mesh.arrayObj);
        context.bufferData(context.ARRAY_BUFFER, new Float32Array(arrayObject), context.STATIC_DRAW);
        context.enableVertexAttribArray(4);
        context.vertexAttribPointer(4, 1, context.FLOAT, false, 0, 0);
    }

    static buildMesh(chunk: Chunk, addFaceFn: (blockId: BlockID) => boolean, skipBlockFn: (blockId: BlockID) => boolean, verts: number[], inds: number[], uvs: number[], normals: number[], faces: number[], arrayObject: number[]): Mesh {
        // chunk.getBlocks().forEach(({ id }, position) => {
        //     const [x, y, z] = position.split(':');

        //     if (skipBlockFn(id)) {
        //         return;
        //     }

        //     let xf, yf;

        //     for (let j = 0; j < ChunkFaces.length; j++) {
        //         xf = BlockUV[id][j * 2];
        //         yf = BlockUV[id][j * 2 + 1];

        //         if (addFaceFn(chunk.getFacingBlockId(x, y, z, j))) {
        //             buildFaces(chunk, index, faces, verts, inds, uvs, normals, arrayObject, j, x, y, z, xf, yf);
        //         }
        //     }
        // });

        const size = Chunk.HEIGHT * Chunk.WIDTH * Chunk.LENGTH;

        for (let index = 0; index < size; index++) {

            const x = index % Chunk.WIDTH,
                  z = ((index / Chunk.WIDTH) | 0) % Chunk.LENGTH,
                  y = (index / (Chunk.WIDTH * Chunk.LENGTH)) | 0;

            const blockId = chunk.getBlockId(x, y, z);

            if (skipBlockFn(blockId)) {
                continue;
            }

            let xf, yf;

            for (let j = 0; j < ChunkFaces.length; j++) {
                xf = BlockUV[blockId][j * 2];
                yf = BlockUV[blockId][j * 2 + 1];

                if (addFaceFn(chunk.getFacingBlockId(x, y, z, j))) {
                    buildFaces(chunk, index, faces, verts, inds, uvs, normals, arrayObject, j, x, y, z, xf, yf);
                }
            }
        }

        return new Mesh('chunk', inds, verts, normals, uvs);
    }
}