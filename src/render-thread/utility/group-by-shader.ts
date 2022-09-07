import type RenderObject from '../RenderObject';
import { ShaderName } from '../shader/ShaderRegistry';

export default function(renderObjects: Map<string, RenderObject>) {
    let grouped: Map<ShaderName, RenderObject[]> = new Map();

    renderObjects.forEach((ro) => {
         if (!grouped.has(ro.shader)) {
             grouped.set(ro.shader, []);
         }

         grouped.get(ro.shader)!.push(ro);
    });

    return grouped;
}