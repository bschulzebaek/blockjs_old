import MessagePayloadInterface from '../../shared/messages/MessagePayloadInterface';
import { SceneMessages } from '../../shared/messages/ThreadMessages';
import Container from './Container';

export default class MessageHandler {
    static onScenePort(event: MessageEvent<MessagePayloadInterface>) {
        switch (event.data.action) {
            case SceneMessages.REDUCE_QUANTITY:
                Container.getInventoryService().getPlayerInventory().reduceActiveItemQuantity();
                break;
            case SceneMessages.TO_VIEW:
                Container.getStateMachine().to_View(event.data.detail);
                break;
            case SceneMessages.PICKUP_ITEM:
                const { itemId } = event.data.detail;
                Container.getInventoryService().getPlayerInventory().pushItem({ itemId, quantity: 1 });
                break;
            case SceneMessages.READY:
                Container.getStateMachine().on_InstanceReady();
                break;
        }
    }
}