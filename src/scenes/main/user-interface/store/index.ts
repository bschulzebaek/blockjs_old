import { reactive } from 'vue';
import InventoryInterface from '../../../../components/inventory/InventoryInterface';
import RawWorldConfigInterface from '../../../../components/world-config/RawWorldConfigInterface';

export interface ApplicationStoreInterface {
    key: number;
    inventory: InventoryInterface|null;
    canvas: HTMLCanvasElement|null;
    config: RawWorldConfigInterface|null;
}

export const store: ApplicationStoreInterface = reactive({
    key: 0,
    inventory: null,
    canvas: null,
    config: null,
});
