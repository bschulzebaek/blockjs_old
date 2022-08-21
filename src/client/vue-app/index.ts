import './styles/index.css';

import { App, createApp } from 'vue';
import { Router } from 'vue-router';

import router from './router';
import RootComponent from './App.vue';
import McButton from './components/mc-button.vue';
import McBackground from './components/mc-background.vue';
import getAssetUrl from '../../utility/get-asset-url';

export default function(container: any): { app: App, router: Router } {
    const app = createApp(RootComponent)
        .use(router)
        .component('mc-button', McButton)
        .component('mc-background', McBackground)
        .provide('$getAssetUrl', getAssetUrl);

    app.config.globalProperties.$container = container;

    return {
        app,
        router
    };
}