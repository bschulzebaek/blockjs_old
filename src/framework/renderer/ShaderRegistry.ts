import SolidShader from './shader/chunk/solid/SolidShader';
import GlassShader from './shader/chunk/glass/GlassShader';
import SkyboxShader from './shader/skybox/SkyboxShader';
import CursorShader from './shader/cursor/CursorShader';
import ItemDropShader from './shader/item-drop/ItemDropShader';

export default class ShaderRegistry {
    private registry = new Map();

    public getShader(key: string) {
        if (!this.registry.has(key)) {
            throw new Error(`[ShaderRegistry]`);
        }

        return this.registry.get(key);
    }

    public compileShaders() {
        this.registry.set('chunk-solid', new SolidShader());
        this.registry.set('chunk-glass', new GlassShader());
        this.registry.set('skybox', new SkyboxShader());
        this.registry.set('cursor', new CursorShader());
        this.registry.set('item-drop', new ItemDropShader());
    }

    public discard() {
        this.registry = new Map();
    }
}