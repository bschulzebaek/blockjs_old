import {
    translate,
    xRotate,
    yRotate,
    zRotate,
    scale,
    identity,
    perspective,
    inverse
} from '.';

export default class Matrix4 extends Array<number> {

    constructor(values: number[] = new Array(16).fill(0)) {
        super(...values);

        if (values.length !== 16) {
            throw new Error('[Matrix4] Invalid array length!');
        }
    }

    public translate = (tx: number, ty: number, tz: number): void => {
        translate(this, tx, ty, tz, this);
    }

    public rotateX = (angleInRadians: number): void => {
        xRotate(this, angleInRadians, this);
    }

    public rotateY = (angleInRadians: number): void => {
        yRotate(this, angleInRadians, this);
    }

    public rotateZ = (angleInRadians: number): void => {
        zRotate(this, angleInRadians, this);
    }

    public scale = (sx: number, sy: number, sz: number): void => {
        scale(this, sx, sy, sz, this);
    }

    public inverse = (dst: Matrix4 = this): Matrix4 => {
        return inverse(this, dst);
    }

    public static identity(dst?: Matrix4): Matrix4 {
        return identity(dst);
    }

    public static perspective(fov: number, aspect: number, near: number, far: number): Matrix4 {
        return perspective(fov, aspect, near, far);
    }
}