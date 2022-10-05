import MessagePayloadInterface from '../../shared/messages/MessagePayloadInterface';

export default class MessageHandler {
    static onMessage(event: MessageEvent<MessagePayloadInterface>) {
        console.log(event)
    }
}