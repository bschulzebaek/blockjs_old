import Container from '../../../Container';

function compileShader(context: WebGL2RenderingContext, src: string, type: number): WebGLShader {
    const shader = context.createShader(type) as WebGLShader;

    context.shaderSource(shader, src);
    context.compileShader(shader);

    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
        console.error(context.getShaderInfoLog(shader));
    }

    return shader;
}

export default function createShaderProgram(vss: string, fss: string): WebGLProgram {
    const context = Container.getContext(),
          program = context.createProgram() as WebGLProgram,
          vs = compileShader(context, vss, context.VERTEX_SHADER),
          fs = compileShader(context, fss, context.FRAGMENT_SHADER);

    context.attachShader(program, vs);
    context.attachShader(program, fs);
    context.linkProgram(program);

    if (!context.getProgramParameter(program, context.LINK_STATUS)) {
        console.error(context.getProgramInfoLog(program));
    }

    return program;
}