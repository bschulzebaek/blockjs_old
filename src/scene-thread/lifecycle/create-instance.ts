import SceneContainer from '../SceneContainer';
import MessageHandler from '../helper/MessageHandler';

export default async function createInstance() {
    await SceneContainer.getSceneService().create();
    await SceneContainer.getWorldService().create();

    MessageHandler.dispatchReady();
}