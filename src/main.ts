import './main-thread';

// @ts-ignore
self.__DEBUG__ = false;

// @ts-ignore
self.__TEST_WORKER__ = new Worker(new URL('./debug-worker.ts', import.meta.url), { type: 'module' });