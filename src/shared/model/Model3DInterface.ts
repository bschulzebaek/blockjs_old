import RawRenderObjectInterface from '../../framework/shader/RawRenderObjectInterface';

export default interface Model3DInterface {
    update(delta: number): void;
    toRawRenderObject(): RawRenderObjectInterface;
}