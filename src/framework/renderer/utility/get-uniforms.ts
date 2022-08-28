import Container from '../../container/Container';
import AttributeInterface from '../AttributeInterface';

export default function getShaderUniforms(program: WebGLProgram): Record<string, AttributeInterface> {
    const context = Container.getContext();

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