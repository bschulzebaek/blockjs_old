import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import MainContainer from './MainContainer';
import ThreadManager from './game-instance/ThreadManager';
import { BroadcastMessages } from '../shared/messages/ThreadMessages';
import { createInstance, discardInstance } from './game-instance';
import { createSceneEventTunnel, discardSceneEventTunnel } from './helper/create-event-tunnel';
import * as UIControls from './helper/ui-controls';
import Fullscreen from './helper/Fullscreen';
import { Views } from '../data/views';
import logger from '../shared/utility/logger';

class StateMachine {
    private router = MainContainer.getRouter();

    constructor() {
        this.router.beforeEach(this.onBeforeRoute.bind(this));
    }

    private onBeforeRoute(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
        logger(to);

        this.handleFrom(to, from);
        this.handleTo(to, next);
    }

    private handleFrom(to: RouteLocationNormalized, from: RouteLocationNormalized) {
        switch (from.name) {
            case Views.GAME_DEFAULT:
                this.from_Default();
                break;
            case Views.GAME_PAUSE:
                this.from_Pause(to);
                break;
        }
    }

    private handleTo(to: RouteLocationNormalized, next: NavigationGuardNext) {
        switch (to.name) {
            case Views.GAME_DEFAULT:
                this.to_Default(next);
                break;
            case Views.GAME_PAUSE:
                this.to_Pause(next);
                break;
            default:
                next();
        }
    }

    private to_Pause(next: NavigationGuardNext) {
        ThreadManager.broadcast(BroadcastMessages.STOP);

        next();
    }

    private from_Pause(to: RouteLocationNormalized) {
        if (to.name === Views.GAME_TEARDOWN) {
            return;
        }

        ThreadManager.broadcast(BroadcastMessages.START);
    }

    private from_Default() {
        document.exitPointerLock();
    }

    private async to_Default(next: NavigationGuardNext) {
        document.body.requestPointerLock();
        await Fullscreen.enter();

        next();
    }

    public to_View(options: any) {
        this.pushTransition(options.name, options.query, options.params);
    }

    public on_InstanceReady() {
        createSceneEventTunnel();
        this.pushTransition(Views.GAME_DEFAULT);
        ThreadManager.broadcast(BroadcastMessages.START);
    }

    public async on_Setup() {
        await Fullscreen.enter();
        createInstance();
        this.registerInGameEvents();
    }

    public async on_Teardown() {
        Fullscreen.exit();
        this.unregisterInGameEvents();
        discardSceneEventTunnel();
        await discardInstance();

        this.pushTransition(Views.MAIN_MENU);
    }

    private registerInGameEvents() {
        addEventListener('fullscreenchange', this.onFullscreenChange);
        addEventListener('blur', this.onBlur);
        addEventListener('keydown', UIControls.onKeyDown);
        addEventListener('keyup', UIControls.onKeyUp);
    }

    private unregisterInGameEvents() {
        removeEventListener('fullscreenchange', this.onFullscreenChange);
        removeEventListener('blur', this.onBlur);
        removeEventListener('keydown', UIControls.onKeyDown);
        removeEventListener('keyup', UIControls.onKeyUp);
    }

    private onFullscreenChange = () => {
        if (!document.fullscreenElement) {
            this.pushTransition(Views.GAME_PAUSE);
        }
    }
    private onBlur = () => {
        this.pushTransition(Views.GAME_PAUSE);
    }

    public pushTransition(name: Views, query = {}, params = {}) {
        this.router.push({ name, query, params })
    }

    public isRoute(name: Views) {
        return this.router.currentRoute.value.name === name;
    }

    public isInGame() {
        const { path, name } = this.router.currentRoute.value;

        return path.startsWith('/game') && name !== Views.GAME_SETUP && name !== Views.GAME_TEARDOWN;
    }
}

export default new StateMachine()