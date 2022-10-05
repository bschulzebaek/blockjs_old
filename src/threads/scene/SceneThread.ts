import './helper/set-globals';
import './helper/load-subscriber';
import MessageHandler from './MessageHandler';
import SceneContainer from './SceneContainer';

onmessage = MessageHandler.onMessage;

// @ts-ignore
self.__DEBUG__ = true;

// @ts-ignore
self.__CONTAINER__ = SceneContainer;