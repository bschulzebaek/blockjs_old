import './user-interface';
import './main-thread';

// @ts-ignore
window.__TEST_WORKER__ = new Worker(new URL('./debug-worker.ts', import.meta.url), { type: 'module' });