export default class MissingShaderError extends Error {
    constructor() {
        super('Missing required shader!');
    }
}