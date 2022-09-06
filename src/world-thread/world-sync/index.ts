import syncToRenderer from './sync-to-renderer';
import syncToScene from './sync-to-scene';

export default function worldSync(newChunks: string[] = [], removeChunks: string[] = []) {
    syncToRenderer(newChunks, removeChunks);
    syncToScene(newChunks, removeChunks);
}