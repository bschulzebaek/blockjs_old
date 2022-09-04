export default class Loop {
    private loopFn: (delta: number) => void;
    private paused = true;

    constructor(loopFn: (delta: number) => void) {
        this.loopFn = loopFn;
    }

    public start() {
        if (!this.paused) {
            return;
        }

        this.paused = false;
        this.loop(0, 0);
    }

    public stop() {
        if (this.paused) {
            return;
        }

        this.paused = true;
    }

    private loop(time: number, lastTime: number) {
        if (this.paused) {
            return;
        }

        const delta = this.getDelta(time, lastTime);
        // console.log((1 / delta).toFixed(1));

        this.loopFn(delta);
        requestAnimationFrame((newTime) => this.loop(newTime, time));
    }

    private getDelta(time: number, lastTime: number): number {
        return Math.min(time - lastTime, 100) / 1000;
    }
}