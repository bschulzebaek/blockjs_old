import Shader from '../../framework/shader/Shader';
import UnsupportedShaderError from '../../framework/shader/UnsupportedShaderError';
import { ShaderName } from '../../framework/shader/shader-names';

import SolidShader from '../../components/chunk/shader/solid/SolidShader';
import GlassShader from '../../components/chunk/shader/glass/GlassShader';
import SkyboxShader from '../../components/skybox/shader/SkyboxShader';
import CursorShader from '../../components/cursor/shader/CursorShader';
import ItemDropShader from '../../components/item-drop/shader/ItemDropShader';

export default class ShaderRegistry {
    private registry: Map<string, Shader > = new Map();

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