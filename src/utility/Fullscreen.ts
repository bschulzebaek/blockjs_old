export default class Fullscreen {
    static enter() {
        if (!!document.fullscreenElement) {
            return;
        }

        document.body.requestFullscreen();
    }

    static exit() {
        if (!document.fullscreenElement) {
            return;
        }

        document.exitFullscreen();
    }
}