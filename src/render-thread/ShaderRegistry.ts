import SkyboxShader from './shader/skybox/SkyboxShader';
import SolidShader from './shader/chunk/solid/SolidShader';
import GlassShader from './shader/chunk/glass/GlassShader';
import CursorShader from './shader/cursor/CursorShader';
import ItemDropShader from './shader/item-drop/ItemDropShader';

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