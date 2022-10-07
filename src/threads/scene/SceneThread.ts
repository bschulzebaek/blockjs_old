import './helper/set-globals';
import './subscriber';
import MessageHandler from './MessageHandler';
import SceneContainer from './SceneContainer';

onmessage = MessageHandler.onMessage;

// @ts-ignore
self.__DEBUG__ = false;

// @ts-ignore
self.__CONTAINER__ = SceneContainer;