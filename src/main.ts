import Container from './framework/container/Container';
import './framework/state-machine/StateMachine';
import './common/utility/prevent-defaults';
import './client/user-interface';

import './common/utility/preload-assets';
import './subscriber';

// @ts-ignore
window.$container = Container;

const testWorker = new Worker(new URL('./worker-test.ts', import.meta.url));


testWorker.addEventListener('message', message => {
    console.log(message);
});


testWorker.postMessage('to testWorker');