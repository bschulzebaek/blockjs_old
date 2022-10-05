export default class UnsupportedShaderError extends Error {
    constructor(name: string) {
        super(`Shader "${name}" not supported!`);
    }
}