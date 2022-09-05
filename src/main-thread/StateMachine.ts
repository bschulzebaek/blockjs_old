import router from '../user-interface/router';
import { Views } from '../user-interface/router/routes';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import Fullscreen from '../shared/utility/Fullscreen';
import { createInstance, discardInstance } from '../thread-manager';
import RawGameConfigInterface from './game-config/RawGameConfigInterface';
import ThreadManager, { ThreadNames } from '../thread-manager/ThreadManager';
import { BroadcastMessages } from '../thread-manager/ThreadMessages';
import * as UIControls from './helper/ui-controls';
import { createEventTunnel, discardEventTunnel } from '../thread-manager/create-event-tunnel';

class StateMachine {
    constructor() {
        router.beforeEach(this.onBeforeRoute.bind(this));
    }

    private onBeforeRoute(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
        console.debug(to)
        this.handleFrom(from);
        this.handleTo(to, next);
    }

    private handleFrom(from: RouteLocationNormalized) {
        switch (from.name) {
            case Views.GAME_DEFAULT:
                this.from_Default();
                break;
        }
    }

    private handleTo(to: RouteLocationNormalized, next: NavigationGuardNext) {
        switch (to.name) {
            case Views.GAME_DEFAULT:
                this.to_Default(next);
                break;
            default:
                next();
        }
    }

    private from_Default() {
        document.exitPointerLock();
        ThreadManager.broadcast(BroadcastMessages.STOP);
    }

    private to_Default(next: NavigationGuardNext) {
        document.body.requestPointerLock();
        Fullscreen.enter();
        ThreadManager.broadcast(BroadcastMessages.START);

        next();
    }

    public to_View(options: any) {
        router.push({
            name: options.name,
            params: options.params,
        });
    }

    public on_InstanceReady() {
        createEventTunnel([ ThreadNames.SCENE ]);
        this.pushTransition(Views.GAME_DEFAULT);
    }

    public on_Setup(canvas: HTMLCanvasElement) {
        Fullscreen.enter();
        createInstance(canvas, router.currentRoute.value.query as unknown as RawGameConfigInterface);
        this.registerInGameEvents();
    }

    public async on_Teardown() {
        Fullscreen.exit();
        this.unregisterInGameEvents();
        discardEventTunnel();
        await discardInstance();

        this.pushTransition(Views.MAIN_MENU);
    }

    private registerInGameEvents() {
        addEventListener('fullscreenchange', this.onFullscreenChange);
        addEventListener('keydown', UIControls.onKeyDown);
        addEventListener('keyup', UIControls.onKeyUp);
    }

    private unregisterInGameEvents() {
        removeEventListener('fullscreenchange', this.onFullscreenChange);
        removeEventListener('keydown', UIControls.onKeyDown);
        removeEventListener('keyup', UIControls.onKeyUp);
    }

    private onFullscreenChange() {
        if (!document.fullscreenElement) {
            this.pushTransition(Views.GAME_PAUSE);
        }
    }

    private pushTransition(name: Views) {
        router.push({ name })
    }

    public isRoute(name: Views) {
        return router.currentRoute.value.name === name;
    }

    public isInGame() {
        const { path, name } = router.currentRoute.value;

        return path.startsWith('/game') && name !== Views.GAME_SETUP && name !== Views.GAME_TEARDOWN;
    }
}

export default new StateMachine()