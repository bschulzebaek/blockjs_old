import gen1 from './generation-v1';

export default function generateChunk(id: string, seed: string) {
    return gen1(id, seed)!;
}