import ModelInterface from '../scene-thread/model/ModelInterface';

export default interface ShaderInterface {
    run(model?: ModelInterface): void;
}