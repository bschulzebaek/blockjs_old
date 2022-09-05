export default class MissingImplementationError extends Error {
    static TEXT = 'Must be implemented!';

    constructor() {
        super(MissingImplementationError.TEXT);
    }
}