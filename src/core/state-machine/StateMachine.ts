import { NavigationGuardNext } from 'vue-router';
import loadAllSaves from './load-all-saves';

class StateMachine {
    public async MainMenu_Load_enter(next: NavigationGuardNext) {
        console.debug('[StateMachine] MainMenu_Load_enter');

        const saves = await loadAllSaves();

        next((vm) => {
            // @ts-ignore
            vm.setSaves(saves);
        });
    }
}

export default new StateMachine()