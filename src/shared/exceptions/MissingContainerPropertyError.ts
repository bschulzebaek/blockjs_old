export default class MissingContainerPropertyError extends Error {
    constructor(container: string, property: string) {
        super(`Container "${container}" missing property "${property}"!`);
    }
}