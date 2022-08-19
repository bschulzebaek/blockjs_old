import EventHelper from '../helper/EventHelper';

import {
    EVENT_STATE_PAUSE,
    EVENT_STATE_RESUME
} from '../state/state-events';

const CLASS_FULLSCREEN = 'fullscreen';

export default class WindowService {
    private isFullscreen: boolean = this.getCurrentState();

    constructor() {
        window.addEventListener('fullscreenchange', this.onFullscreenChange.bind(this));
    }

    public setIsFullscreen(state: boolean): void {
        this.isFullscreen = state;
    }

    public getIsFullscreen(): boolean {
        return this.isFullscreen;
    }

    private getCurrentState(): boolean {
        return !!document.fullscreenElement;
    }

    private onFullscreenChange = (): void => {
        this.setIsFullscreen(this.getCurrentState());

        this.getIsFullscreen() ? this.onEnterFullscreen() : this.onExitFullscreen();
    }

    private onEnterFullscreen(): void {
        document.body.classList.add(CLASS_FULLSCREEN);

        EventHelper.dispatch(EVENT_STATE_RESUME);
    }

    private onExitFullscreen(): void {
        document.body.classList.remove(CLASS_FULLSCREEN);

        EventHelper.dispatch(EVENT_STATE_PAUSE);
    }
}