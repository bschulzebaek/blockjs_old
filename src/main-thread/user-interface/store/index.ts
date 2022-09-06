import { reactive } from 'vue';
import InventoryInterface from '../../inventory/InventoryInterface';
import RawGameConfigInterface from '../../game-config/RawGameConfigInterface';

export interface ApplicationStoreInterface {
    key: number;
    inventory: InventoryInterface|null;
    canvas: HTMLCanvasElement|null;
    config: RawGameConfigInterface|null;
}

export const store: ApplicationStoreInterface = reactive({
    key: 0,
    inventory: null,
    canvas: null,
    config: null,
});
