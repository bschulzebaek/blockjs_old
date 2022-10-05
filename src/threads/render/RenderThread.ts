import './RenderSubscriber';
import MessageHandler from './MessageHandler';

onmessage = MessageHandler.onMessage;

// @ts-ignore
self.__DEBUG__ = false;