import MessageHandler from './MessageHandler';
import WorldContainer from './WorldContainer';

onmessage = MessageHandler.onMessage;

// @ts-ignore
self.__DEBUG__ = false;

// @ts-ignore
self.__CONTAINER__ = WorldContainer;