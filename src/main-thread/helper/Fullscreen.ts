export default class Fullscreen {
    static enter() {
        if (Fullscreen.active()) {
            return;
        }

        return document.body.requestFullscreen();
    }

    static exit() {
        if (!Fullscreen.active()) {
            return;
        }

        return document.exitFullscreen();
    }

    static active() {
        return !!document.fullscreenElement;
    }
}