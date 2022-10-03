import ModelInterface from '../model/ModelInterface';
import { ShaderName } from '../../render-thread/shader/ShaderRegistry';

export default interface SceneObjectInterface {
    model?: ModelInterface;
    getId(): string;
    update(delta: number): void;
    createModel?(): void;
    discard?(): void;
    getShader(): ShaderName|null;
    getRenderData(): any;
    getTransferable?(): Transferable[];
}