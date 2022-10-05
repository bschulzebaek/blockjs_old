import ShaderAttributeInterface from './ShaderAttributeInterface';

export default function getShaderUniforms(context: WebGL2RenderingContext, program: WebGLProgram): Record<string, ShaderAttributeInterface> {
    return [...Array(context.getProgramParameter(program, context.ACTIVE_UNIFORMS))].map((_, i) => {
        const { size, type, name } = (context.getActiveUniform(program, i) as WebGLActiveInfo),
                loc = context.getUniformLocation(program, name);

        return {
            size,
            type,
            loc,
            name: name.split('[')[0]
        }
    }).reduce((acc, { name, size, type, loc }) => {
        // @ts-ignore
        acc[name] = {
            name,
            size,
            type,
            loc
        };

        return acc;
    }, {});
}