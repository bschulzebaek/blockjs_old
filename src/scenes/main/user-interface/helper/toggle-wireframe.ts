import ThreadManager, { ThreadNames } from '../../../../threads/main/thread-manager/ThreadManager';
import { RenderMessages } from '../../../../shared/messages/ThreadMessages';

export default function toggleWireframe(event: KeyboardEvent) {
    if (event.key === 'F12') {
        ThreadManager.send(ThreadNames.RENDER, RenderMessages.SET_DRAW_MODE);
    }
}