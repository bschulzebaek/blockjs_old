import Fullscreen from '../../common/utility/Fullscreen';
import router from '../../client/router';
import { Views, Paths } from '../../client/router/routes';
import { navigationControlKeyDown, navigationControlKeyUp } from '../../client/helper/InGameNavigationControl';

class StateMachine {

    constructor() {
        this.registerEventListener();
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
        console.log(query)
        if (query.id === undefined && query.name === undefined && query.seed === undefined) {
            throw new Error('[StateMachine] Missing required parameter!');
        }

        this.pushTransition(Views.GAME_SETUP, query);
    }

    public to_GameDefault = async () => {
        Fullscreen.enter();

        this.pushTransition(Views.GAME_DEFAULT);
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