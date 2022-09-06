import MessagePayloadInterface from '../../shared/messages/MessagePayloadInterface';
import StateMachine from '../StateMachine';
import { WorldMessages } from '../../shared/messages/ThreadMessages';

export default function onWorldThreadMessage(event: MessageEvent<MessagePayloadInterface>) {
    switch (event.data.action) {
        case WorldMessages.READY:
            StateMachine.on_InstanceReady();
            break;
    }
}