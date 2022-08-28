import Container from './core/container/Container';
import './core/state-machine/StateMachine';
import './common/utility/prevent-defaults';
import './client/user-interface';

import preloadAssets from './common/utility/preload-assets';

preloadAssets();

// @ts-ignore
window.$container = Container;