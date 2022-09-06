export default class ConfigNotFoundError extends Error {
    constructor() {
        super(`Setup config not found!`);
    }
}