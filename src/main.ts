import Container from './framework/container/Container';
import './framework/state-machine/StateMachine';
import './common/utility/prevent-defaults';
import './client/user-interface';

import preloadAssets from './common/utility/preload-assets';

preloadAssets();

// @ts-ignore
window.$container = Container;