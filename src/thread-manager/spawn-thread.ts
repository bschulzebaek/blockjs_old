/**
 * @param path - Path to the Worker entry point. Must be relative to this script!
 */
export default function spawnThread(path: string) {
    return new Worker(new URL(path, import.meta.url), { type: 'module' })
}