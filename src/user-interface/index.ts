import './styles/index.css';
import { createApp } from 'vue';
import router from './router';
import RootComponent from './App.vue';
import McButton from './components/mc-button.vue';
import McBackground from './components/mc-background.vue';
import ItemSlot from './components/item-slot.vue';
import getAssetUrl from '../shared/utility/get-asset-url';
import { store } from './store';
import { Views } from '../data/views';
import StateMachine from '../threads/main/StateMachine';
import Container from '../threads/main/Container';
import './helper/prevent-defaults';

StateMachine.setRouter(router);

const app = createApp(RootComponent)
    .use(router)
    .component('mc-button', McButton)
    .component('mc-background', McBackground)
    .component('item-slot', ItemSlot)
    .provide('$store', store)
    .provide('$container', Container)
    .provide('$getAssetUrl', getAssetUrl);

router.push({ name: Views.MAIN_MENU });

app.mount('#app');