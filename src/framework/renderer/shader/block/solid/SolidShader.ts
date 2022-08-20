import vss from './vss';
import fss from './fss';
import BaseShader from '../BaseShader';
import CameraInterface from '../../../../scene/camera/CameraInterface';
import WorldInterface from '../../../../scene/world/WorldInterface';
import ChunkInterface from '../../../../scene/world/chunk/ChunkInterface';
import ModelInterface from '../../../../scene/model/ModelInterface';

export default class SolidShader extends BaseShader {

    constructor(camera: CameraInterface, world: WorldInterface) {
        super(camera, world, vss, fss);
    }

    protected preRender() {
        const { context } = this;

        context.enable(context.DEPTH_TEST);
        context.depthMask(true);
        context.enable(context.BLEND);
        context.enable(context.CULL_FACE);
    }

    protected getChunkModel(chunk: ChunkInterface): ModelInterface {
        return chunk.getSolidModel();
    }
}