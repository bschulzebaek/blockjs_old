export default class MissingModelError extends Error {
    constructor() {
        super('Missing required model!');
    }
}