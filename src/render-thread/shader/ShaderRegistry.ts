import SkyboxShader from './skybox/SkyboxShader';
import SolidShader from './chunk/solid/SolidShader';
import GlassShader from './chunk/glass/GlassShader';
import CursorShader from './cursor/CursorShader';
import ItemDropShader from './item-drop/ItemDropShader';

export default class ShaderRegistry {
    private registry = new Map();

    public get(key: string) {
        if (!this.registry.has(key)) {
            throw new Error(`[ShaderRegistry] Shader "${key}" not found!`);
        }

        return this.registry.get(key);
    }

    public compileShaders(context: WebGL2RenderingContext) {
        this.registry.set('chunk-solid', new SolidShader(context));
        this.registry.set('chunk-glass', new GlassShader(context));
        this.registry.set('skybox', new SkyboxShader(context));
        this.registry.set('cursor', new CursorShader(context));
        this.registry.set('item-drop', new ItemDropShader(context));
    }

    public discard() {
        this.registry = new Map();
    }
}