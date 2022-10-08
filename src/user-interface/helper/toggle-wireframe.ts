import ThreadManager, { ThreadNames } from '../../threads/main/thread-manager/ThreadManager';
import { RenderMessages } from '../../shared/messages/ThreadMessages';

export default function toggleWireframe(event: KeyboardEvent) {
    if (event.code === 'Dead') {
        ThreadManager.send(ThreadNames.RENDER, RenderMessages.SET_DRAW_MODE);
    }
}