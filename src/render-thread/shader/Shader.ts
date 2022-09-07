import createShaderProgram from './utility/create-program';
import getShaderUniforms from './utility/get-uniforms';
import ShaderAttributeInterface from './ShaderAttributeInterface';
import MissingImplementationError from '../../shared/exceptions/MissingImplementationError';
import RenderObject from '../RenderObject';

export default class Shader {

    protected readonly context: WebGL2RenderingContext;
    protected readonly uniforms: Record<string, ShaderAttributeInterface>;
    protected readonly program: WebGLProgram;

    constructor(context: WebGL2RenderingContext, vss: string, fss: string) {
        this.context = context;
        this.program = createShaderProgram(context, vss, fss);
        this.uniforms = getShaderUniforms(context, this.program);

        this.context.useProgram(this.program);
    }

    public run(batch: RenderObject[], projection: Float32Array, view: Float32Array) {
        if (!batch.length) {
            return;
        }

        this.context.useProgram(this.program);

        this.setup(projection, view);
        this.drawBatch(batch);
        this.cleanup();

        this.context.useProgram(null);
    }

    // @ts-ignore
    protected setup(projection: Float32Array, view: Float32Array) {
        throw new MissingImplementationError();
    }

    // @ts-ignore
    protected drawBatch(batch: RenderObject[]) {
        throw new MissingImplementationError();
    }

    protected cleanup() {
        throw new MissingImplementationError();
    }
}