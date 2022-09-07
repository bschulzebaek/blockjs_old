import ModelInterface from './model/ModelInterface';
import { ShaderName } from '../render-thread/shader/ShaderRegistry';

export default interface SceneObjectInterface {
    model?: ModelInterface;
    getId(): string;
    getShader(): ShaderName;
    update(delta: number): void;
    createModel?(): void;
    discard?(): void;
}