export default class Fullscreen {
    static enter() {
        if (Fullscreen.active()) {
            return;
        }

        document.body.requestFullscreen();
    }

    static exit() {
        if (!Fullscreen.active()) {
            return;
        }

        document.exitFullscreen();
    }

    static active() {
        return !!document.fullscreenElement;
    }
}