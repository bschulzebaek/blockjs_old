import './subscriber';
import MessageHandler from './helper/MessageHandler';

onmessage = MessageHandler.onMessage;

// @ts-ignore
self.__DEBUG__ = false;