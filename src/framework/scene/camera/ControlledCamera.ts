import Camera from './Camera';

export default class ControlledCamera extends Camera {

    private rotateRateX: number = -150;
    private rotateRateY: number = -120;

    constructor(context: WebGL2RenderingContext, fov = 70, near = 0.1, far = 300.0) {
        super(context, fov, near, far);

        window.addEventListener('mousemove', this.onMouseMove.bind(this));

        // mcjs.controlsRegistry.bindCallback(ControlNames.CAMERA, this.onMouseMove.bind(this));
    }

    private onMouseMove(event: MouseEvent): void {
        // if (!window.mcjs.utility.inGameDefault()) {
        //     return;
        // }

        const { movementX, movementY } = event,
              { rotateRateX, rotateRateY } = this;

        this.transform.rotation.x += movementY * (rotateRateX / window.screen.availHeight);
        this.transform.rotation.x = Math.max(-90, Math.min(90, this.transform.rotation.x));
        this.transform.rotation.y += movementX * (rotateRateY / window.screen.availWidth);
    }
}