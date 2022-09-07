import SkyboxShader from './skybox/SkyboxShader';
import SolidShader from './chunk/solid/SolidShader';
import GlassShader from './chunk/glass/GlassShader';
import CursorShader from './cursor/CursorShader';
import ItemDropShader from './item-drop/ItemDropShader';
import type Shader from './Shader';
import UnsupportedShaderError from '../../shared/exceptions/UnsupportedShaderError';

export enum ShaderName {
    CHUNK_SOLID = 'chunk-solid',
    CHUNK_GLASS = 'chunk-glass',
    SKYBOX = 'skybox',
    CURSOR = 'cursor',
    ITEM_DROP = 'item-drop'
}

export default class ShaderRegistry {
    private registry: Map<string, Shader> = new Map();

    public get(key: string) {
        if (!this.registry.has(key)) {
            throw new UnsupportedShaderError(key);
        }

        return this.registry.get(key)!;
    }

    public compileShaders(context: WebGL2RenderingContext) {
        this.registry.set(ShaderName.CHUNK_SOLID, new SolidShader(context));
        this.registry.set(ShaderName.CHUNK_GLASS, new GlassShader(context));
        this.registry.set(ShaderName.SKYBOX, new SkyboxShader(context));
        this.registry.set(ShaderName.CURSOR, new CursorShader(context));
        this.registry.set(ShaderName.ITEM_DROP, new ItemDropShader(context));
    }
}