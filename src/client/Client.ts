import createVueApp from './vue-app';
import { type App } from 'vue';
import { type Router } from 'vue-router';
import { Views } from './vue-app/router/routes';
import Container from '../framework/Container';

export default class Client {
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
}