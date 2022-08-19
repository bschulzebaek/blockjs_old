import WindowService from './client/WindowService';

export default class GameManager {
    private canvas: HTMLCanvasElement;
    private windowService = new WindowService();

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }
}