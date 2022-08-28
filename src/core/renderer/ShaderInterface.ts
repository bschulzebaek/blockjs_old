import ModelInterface from '../scene/model/ModelInterface';

export default interface ShaderInterface {
    run(model: ModelInterface): void;
}