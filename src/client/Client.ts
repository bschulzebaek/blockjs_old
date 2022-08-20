import createVueApp from './vue-app';
import { type App } from 'vue';
import { type Router } from 'vue-router';
import { Views } from './vue-app/router/routes';
import Container from '../framework/Container';

export default class Client {
    // private isFullscreen: boolean = this.getCurrentState();

    private app: App;

    private router: Router;

    constructor(container: HTMLElement) {
        const { app, router } = createVueApp(Container);

        this.app = app;
        this.router = router;

        this.mountApp(container);
        this.setView(Views.MAIN_MENU);
    }

    private mountApp(container: HTMLElement) {
        this.app.mount(container);
    }

    public setView(name: Views): void {
        this.router.push({ name });
    }

    // public setIsFullscreen(state: boolean): void {
    //     this.isFullscreen = state;
    // }

    // public getIsFullscreen(): boolean {
    //     return this.isFullscreen;
    // }

    // private getCurrentState(): boolean {
    //     return !!document.fullscreenElement;
    // }
}