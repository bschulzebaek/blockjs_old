import { reactive } from 'vue';
import InventoryInterface from '../../main-thread/inventory/InventoryInterface';

interface ApplicationStore {
    inventory: InventoryInterface|null;
}

export const store: ApplicationStore = reactive({
    inventory: null
});