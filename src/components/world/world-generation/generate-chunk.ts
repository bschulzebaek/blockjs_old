import { createDebugChunk } from './debug-world';

// @ts-ignore
export default function generateChunk(id: string, seed: string) {
    return createDebugChunk(id);
}