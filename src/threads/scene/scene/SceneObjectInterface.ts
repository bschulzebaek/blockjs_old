import Model3DInterface from '../../../shared/model/Model3DInterface';
import { ShaderName } from '../../../framework/shader/shader-names';

export default interface SceneObjectInterface {
    model?: Model3DInterface;
    getId(): string;
    update(delta: number): void;
    createModel?(): void;
    discard?(): void;
    getShader(): ShaderName|null;
    getRenderData(): any;
    getTransferable?(): Transferable[];
}