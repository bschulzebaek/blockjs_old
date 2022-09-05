import './user-interface';
import './main-thread';

import spawnThread from './thread-manager/spawn-thread';

// @ts-ignore
window.__TEST_WORKER__ = spawnThread('../test-worker.ts');