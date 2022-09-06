export default class UnhandledMessageError extends Error {
    constructor(message: string) {
        super(`Unhandled message "${message}"`);
    }
}