import './helper/set-globals';
import MessageHandler from './helper/MessageHandler';
import SceneContainer from './SceneContainer';

onmessage = MessageHandler.onMessage;

// @ts-ignore
self.__DEBUG__ = true;

// @ts-ignore
self.__CONTAINER__ = SceneContainer;