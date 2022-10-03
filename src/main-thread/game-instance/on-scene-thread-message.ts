import MessagePayloadInterface from '../../shared/messages/MessagePayloadInterface';
import MainContainer from '../MainContainer';
import StateMachine from '../StateMachine';
import { SceneMessages } from '../../shared/messages/ThreadMessages';

export default function onSceneThreadMessage(event: MessageEvent<MessagePayloadInterface>) {
    switch (event.data.action) {
        case SceneMessages.REDUCE_QUANTITY:
            MainContainer.getInventoryService().getPlayerInventory().reduceActiveItemQuantity();
            break;
        case SceneMessages.TO_VIEW:
            StateMachine.to_View(event.data.detail);
            break;
        case SceneMessages.PICKUP_ITEM:
            const { itemId } = event.data.detail;
            MainContainer.getInventoryService().getPlayerInventory().pushItem({ itemId, quantity: 1 });
            break;
        case SceneMessages.READY:
            StateMachine.on_InstanceReady();
            break;
    }
}