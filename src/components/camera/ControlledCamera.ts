import Camera from './Camera';

export default class ControlledCamera extends Camera {
    static ROTATE_RATE_X = -120;
    static ROTATE_RATE_Y = -135;

    constructor(fov = 70, near = 0.1, far = 300.0) {
        super(fov, near, far);

        addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    private onMouseMove(event: MouseEvent): void {
        // @ts-ignore
        const { movementX, movementY } = event.detail,
              rotation = this.getTransform().getRotation();

        rotation.add(
            movementY * (ControlledCamera.ROTATE_RATE_X / innerWidth),
            movementX * (ControlledCamera.ROTATE_RATE_Y / innerHeight),
            0
        );

        rotation.x = Math.max(-90, Math.min(90, rotation.x));
    }
}