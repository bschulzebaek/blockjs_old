import ShaderAttributeInterface from '../ShaderAttributeInterface';

export default function getShaderAttributes(context: WebGL2RenderingContext, program: WebGLProgram): Record<string, ShaderAttributeInterface> {
    return [...Array(context.getProgramParameter(program, context.ACTIVE_ATTRIBUTES))].map((_, i) => {
        const { size, type, name } = (context.getActiveAttrib(program, i) as WebGLActiveInfo),
                loc = context.getAttribLocation(program, name);

        return {
            size,
            type,
            loc,
            name: name.split('[')[0]
        }
    }) .reduce((acc, el) => {
        // @ts-ignore
        acc[el.name] = el;

        return acc;
    }, {});
}