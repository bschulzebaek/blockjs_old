import Fullscreen from '../../common/utility/Fullscreen';
import router from '../../client/user-interface/router';
import { Views, Paths } from '../../client/user-interface/router/routes';
import { navigationControlKeyDown, navigationControlKeyUp } from '../../client/user-interface/helper/InGameNavigationControl';
import Container, { ServiceName } from '../container/Container';
import prepareCanvas from '../../common/utility/prepare-canvas';

class StateMachine {

    constructor() {
        this.registerEventListener();
    }

    public game_play(canvas: HTMLCanvasElement) {
        const gameInstance = Container.getGameInstance(),
              renderer     = Container.getRenderer();

        if (!gameInstance) {
            throw new Error('[StateMachine:game_play] Missing required GameInstance!');
        }

        Container.setContext(canvas.getContext('webgl2') as WebGL2RenderingContext);

        prepareCanvas(canvas);

        gameInstance.getScene().beforePlay();
        renderer.start();
    }

    public game_resume(canvas: HTMLCanvasElement) {
        if (Container.isRunning()) {
            return;
        }

        canvas.requestPointerLock();
        Container.getRenderer().start();
    }

    public game_pause() {
        Container.getRenderer().stop();
        document.exitPointerLock();
    }

    public to_MainMenu = async () => {
        this.pushTransition(Views.MAIN_MENU);
    }

    public to_MainMenuNew = async () => {
        this.pushTransition(Views.MAIN_MENU_NEW);
    }

    public to_MainMenuLoad = async () => {
        this.pushTransition(Views.MAIN_MENU_LOAD);
    }

    public to_MainMenuSettings = async () => {
        this.pushTransition(Views.MAIN_MENU_SETTINGS);
    }

    public to_GameSetup = async (query: any = {}) => {
        if (query.id === undefined && query.name === undefined && query.seed === undefined) {
            throw new Error('[StateMachine:to_GameSetup] Missing required parameter!');
        }

        this.pushTransition(Views.GAME_SETUP, query);
    }

    public GameSetup_GameDefault = async () => {
        Fullscreen.enter();

        await Container.setup(router.currentRoute.value.query);
        await Container.getGameInstance()?.setup();

        this.pushTransition(Views.GAME_DEFAULT);
    }

    public to_GameDefault = async () => {
        Fullscreen.enter();
        this.pushTransition(Views.GAME_DEFAULT);
    }

    public to_GameChest = async (inventoryId: string) => {
        if (!inventoryId) {
            throw new Error('[StateMachine.to_GameChest] Missing required parameter!');
        }

        await Container.getService(ServiceName.INVENTORY).loadInventory(inventoryId);

        this.pushTransition(Views.GAME_CHEST, {}, { id: inventoryId });
    }

    public to_GameCraftingTable = async () => {
        this.pushTransition(Views.GAME_CRAFTING_TABLE);
    }

    public to_GamePause = async () => {
        this.pushTransition(Views.GAME_PAUSE);
    }

    public to_GameTeardown = async () => {
        this.pushTransition(Views.GAME_TEARDOWN);
    }

    public exit_Fullscreen = async () => {
        Fullscreen.exit();
    }

    private registerEventListener() {
        window.addEventListener('blur', this.onTabBlur);
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
    }

    private pushTransition(name: Views, query = {}, params = {}) {
        router.push({ name, query, params });
    }

    private onTabBlur = () => {
        if (!this.isCurrentRoute(Views.GAME_DEFAULT)) {
            return;
        }

        this.pushTransition(Views.GAME_PAUSE);
    }

    private isCurrentRoute(name: Views) {
        return router.currentRoute.value.name === name;
    }

    // @ts-ignore;
    private includesPath(path: Paths) {
        return router.currentRoute.value.path.includes(path);
    }

    private onKeyDown = (event: KeyboardEvent) => {
        navigationControlKeyDown(event, router);
    }

    private onKeyUp = (event: KeyboardEvent) => {
        navigationControlKeyUp(event);
    }
}

export default new StateMachine()