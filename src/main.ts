import Client from './client/Client';
import Container from './framework/Container';

new Client(document.getElementById('app')!);

// @ts-ignore
window.$container = Container;