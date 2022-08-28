import './styles/index.css';
import { createApp } from 'vue';
import router from './router';
import RootComponent from './App.vue';
import McButton from './components/mc-button.vue';
import McBackground from './components/mc-background.vue';
import ItemSlot from './components/item-slot.vue';
import getAssetUrl from '../common/utility/get-asset-url';
import Container from '../core/container/Container';
import StateMachine from '../core/state-machine/StateMachine';

const app = createApp(RootComponent)
    .use(router)
    .component('mc-button', McButton)
    .component('mc-background', McBackground)
    .component('item-slot', ItemSlot)
    .provide('$getAssetUrl', getAssetUrl);

app.config.globalProperties.$container = Container;
app.config.globalProperties.$stateMachine = StateMachine;

StateMachine.to_MainMenu();

app.mount('#app');