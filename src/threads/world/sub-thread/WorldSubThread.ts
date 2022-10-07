import MessageHandler from './MessageHandler';
import WorldSubContainer from './WorldSubContainer';

onmessage = MessageHandler.onMessage;

// @ts-ignore
self.__DEBUG__ = true;

// @ts-ignore
self.__CONTAINER__ = WorldSubContainer;