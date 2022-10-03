import logger from '../../shared/utility/logger';
import SceneContainer from '../SceneContainer';

export default async function discardInstance() {
    logger('[SceneThread:discard-start]');

    await SceneContainer.getEntityService().save();

    logger('[SceneThread:discard-finish]');
    self.close();
}