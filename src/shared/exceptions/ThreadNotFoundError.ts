export default class ThreadNotFoundError extends Error {
    constructor(name: string) {
        super(`Thread "${name}" not found!`);
    }
}