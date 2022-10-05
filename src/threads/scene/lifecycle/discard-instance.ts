import SceneContainer from '../SceneContainer';

export default async function discardInstance() {
    await SceneContainer.getEntityService().save();

    self.close();
}