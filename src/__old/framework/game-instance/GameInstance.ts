import generateSeed from '../../common/utility/generate-seed';
import Container, { ServiceName } from '../container/Container';
import Scene from '../scene/Scene';

export interface SetupDataInterface {
    id?: string;
    name?: string;
    seed?: string;
    isNew?: boolean;
}

export default class GameInstance {
    static DEFAULT_NAME = 'New WorldService';

    private id: string;
    private name: string;
    private seed: string;
    private isNew: boolean;

    private scene = new Scene();

    constructor(setupData: SetupDataInterface) {
        this.id = setupData.id!;
        this.name = setupData.name ?? GameInstance.DEFAULT_NAME;
        this.seed = setupData.seed ?? generateSeed();
        this.isNew = !!setupData.isNew;

        Container.getRenderer().setScene(this.scene);

        // window.addEventListener('beforeunload', this.onBeforeUnload);
    }

    public getScene() {
        return this.scene;
    }

    public async setup() {
        if (this.isNew) {
            await this.new();
        } else {
            await this.load();
        }
    }

    public async new() {
        await Container.getService(ServiceName.GAME_CONFIG).new(this.id, this.name, this.seed),

        await Promise.all([
            Container.getService(ServiceName.ENTITY).new(),
            Container.getService(ServiceName.INVENTORY).new(),
        ]);

        await Container.getService(ServiceName.WORLD).new();
    }

    public async load(): Promise<void> {
        await Container.getService(ServiceName.GAME_CONFIG).load();

        await Promise.all([
            Container.getService(ServiceName.ENTITY).load(),
            Container.getService(ServiceName.INVENTORY).load(),
        ]);

        await Container.getService(ServiceName.WORLD).load();

    }

    public async teardown(): Promise<void> {
        await this.scene.discard();
    }

    // @ts-ignore
    private onBeforeUnload = async (event: BeforeUnloadEvent) => {
        this.teardown();

        event.preventDefault();
        event.returnValue = 'unsaved-changes';

        return event.returnValue;
    }
}