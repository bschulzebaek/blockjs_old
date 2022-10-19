import './styles/index.css';
import { createApp } from 'vue';
import router from './router';
import RootComponent from './App.vue';
import McButton from './components/mc-button.vue';
import McBackground from './components/mc-background.vue';
import ItemSlot from './components/item-slot.vue';
import { store } from './store';
import './helper/prevent-defaults';

// @ts-ignore
import { Views } from '@/data/views';
// @ts-ignore
import StateMachine from '@/threads/main/StateMachine';
// @ts-ignore
import Container from '@/threads/main/Container';

StateMachine.setRouter(router);

const app = createApp(RootComponent)
    .use(router)
    .component('mc-button', McButton)
    .component('mc-background', McBackground)
    .component('item-slot', ItemSlot)
    .provide('$store', store)
    .provide('$container', Container)

router.push({ name: Views.MAIN_MENU });

app.mount('#app');