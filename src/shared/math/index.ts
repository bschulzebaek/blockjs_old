import Matrix4 from './Matrix4';
import Vector4 from './Vector4';
import Vector3 from './Vector3';
import Transform from './Transform';
import Ray from './Ray';

export {
    Matrix4,
    Ray,
    Transform,
    Vector3,
    Vector4,

    degree2Radians,

    addVectors,
    axisRotate,
    axisRotation,
    copy,
    cross,
    distance,
    distanceSq,
    dot,
    frustum,
    identity,
    inverse,
    lookAt,
    multiply,
    normalize,
    orthographic,
    perspective,
    scale,
    scaling,
    subtractVectors,
    transformDirection,
    transformNormal,
    transformPoint,
    transformVector,
    translate,
    translation,
    transpose,
    xRotate,
    xRotation,
    yRotate,
    yRotation,
    zRotate,
    zRotation
}

const degree2Radians = Math.PI / 180;

function multiply(a: Matrix4, b: Matrix4, dst: Matrix4 = new Matrix4()): Matrix4 {
    const b00 = b[0 * 4 + 0],
          b01 = b[0 * 4 + 1],
          b02 = b[0 * 4 + 2],
          b03 = b[0 * 4 + 3],
          b10 = b[1 * 4 + 0],
          b11 = b[1 * 4 + 1],
          b12 = b[1 * 4 + 2],
          b13 = b[1 * 4 + 3],
          b20 = b[2 * 4 + 0],
          b21 = b[2 * 4 + 1],
          b22 = b[2 * 4 + 2],
          b23 = b[2 * 4 + 3],
          b30 = b[3 * 4 + 0],
          b31 = b[3 * 4 + 1],
          b32 = b[3 * 4 + 2],
          b33 = b[3 * 4 + 3],
          a00 = a[0 * 4 + 0],
          a01 = a[0 * 4 + 1],
          a02 = a[0 * 4 + 2],
          a03 = a[0 * 4 + 3],
          a10 = a[1 * 4 + 0],
          a11 = a[1 * 4 + 1],
          a12 = a[1 * 4 + 2],
          a13 = a[1 * 4 + 3],
          a20 = a[2 * 4 + 0],
          a21 = a[2 * 4 + 1],
          a22 = a[2 * 4 + 2],
          a23 = a[2 * 4 + 3],
          a30 = a[3 * 4 + 0],
          a31 = a[3 * 4 + 1],
          a32 = a[3 * 4 + 2],
          a33 = a[3 * 4 + 3];

    dst[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
    dst[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
    dst[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
    dst[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
    dst[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
    dst[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
    dst[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
    dst[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
    dst[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
    dst[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
    dst[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
    dst[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
    dst[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
    dst[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
    dst[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
    dst[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;

    return dst;
}

function addVectors(a: Vector3, b: Vector3, dst: Vector3 = new Vector3()): Vector3 {
    dst[0] = a[0] + b[0];
    dst[1] = a[1] + b[1];
    dst[2] = a[2] + b[2];

    return dst;
}

function subtractVectors(a: Vector3, b: Vector3, dst: Vector3 = new Vector3()): Vector3 {
    dst[0] = a[0] - b[0];
    dst[1] = a[1] - b[1];
    dst[2] = a[2] - b[2];

    return dst;
}

function normalize(v: Vector3, dst: Vector3 = new Vector3()): Vector3 {
    const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);

    if (length > 0.00001) {
        dst[0] = v[0] / length;
        dst[1] = v[1] / length;
        dst[2] = v[2] / length;
    }

    return dst;
}

function cross(a: Vector3, b: Vector3, dst: Vector3 = new Vector3()): Vector3 {
    dst[0] = a[1] * b[2] - a[2] * b[1];
    dst[1] = a[2] * b[0] - a[0] * b[2];
    dst[2] = a[0] * b[1] - a[1] * b[0];

    return dst;
}

function dot(a: Vector3, b: Vector3): number {
    return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]);
}

function distanceSq(a: Vector3, b: Vector3): number {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    const dz = a[2] - b[2];

    return dx * dx + dy * dy + dz * dz;
}

function distance(a: Vector3, b: Vector3): number {
    return Math.sqrt(distanceSq(a, b));
}

function identity(dst: Matrix4 = new Matrix4()): Matrix4 {
    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
}

function transpose(m: Matrix4, dst: Matrix4 = new Matrix4()): Matrix4 {
    dst[0] = m[0];
    dst[1] = m[4];
    dst[2] = m[8];
    dst[3] = m[12];
    dst[4] = m[1];
    dst[5] = m[5];
    dst[6] = m[9];
    dst[7] = m[13];
    dst[8] = m[2];
    dst[9] = m[6];
    dst[10] = m[10];
    dst[11] = m[14];
    dst[12] = m[3];
    dst[13] = m[7];
    dst[14] = m[11];
    dst[15] = m[15];

    return dst;
}

function lookAt(cameraPosition: Vector3, target: Vector3, up: Vector3, dst: Matrix4 = new Matrix4()): Matrix4 {
    const zAxis = normalize(subtractVectors(cameraPosition, target)),
          xAxis = normalize(cross(up, zAxis)),
          yAxis = normalize(cross(zAxis, xAxis));

    dst[0] = xAxis[0];
    dst[1] = xAxis[1];
    dst[2] = xAxis[2];
    dst[3] = 0;
    dst[4] = yAxis[0];
    dst[5] = yAxis[1];
    dst[6] = yAxis[2];
    dst[7] = 0;
    dst[8] = zAxis[0];
    dst[9] = zAxis[1];
    dst[10] = zAxis[2];
    dst[11] = 0;
    dst[12] = cameraPosition[0];
    dst[13] = cameraPosition[1];
    dst[14] = cameraPosition[2];
    dst[15] = 1;

    return dst;
}

function perspective(fieldOfViewInRadians: number, aspect: number, near: number, far: number, dst: Matrix4 = new Matrix4()): Matrix4 {
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians),
          rangeInv = 1.0 / (near - far);

    dst[0] = f / aspect;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = f;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = (near + far) * rangeInv;
    dst[11] = -1;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = near * far * rangeInv * 2;
    dst[15] = 0;

    return dst;
}

function orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number, dst: Matrix4 = new Matrix4()): Matrix4 {
    dst[0] = 2 / (right - left);
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 2 / (top - bottom);
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 2 / (far - near);
    dst[11] = 0;
    dst[12] = (left + right) / (left - right);
    dst[13] = (bottom + top) / (bottom - top);
    dst[14] = (near + far) / (near - far);
    dst[15] = 1;

    return dst;
}

function frustum(left: number, right: number, bottom: number, top: number, near: number, far: number, dst: Matrix4 = new Matrix4()): Matrix4 {
    const dx = right - left,
          dy = top - bottom,
          dz = far - near;

    dst[0] = 2 * near / dx;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 2 * near / dy;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = (left + right) / dx;
    dst[9] = (top + bottom) / dy;
    dst[10] = -(far + near) / dz;
    dst[11] = -1;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = -2 * near * far / dz;
    dst[15] = 0;

    return dst;
}

function translation(tx: number, ty: number, tz: number, dst: Matrix4 = new Matrix4()): Matrix4 {
    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = tx;
    dst[13] = ty;
    dst[14] = tz;
    dst[15] = 1;

    return dst;
}

function translate(m: Matrix4, tx: number, ty: number, tz: number, dst: Matrix4 = new Matrix4()): Matrix4 {
    const m00 = m[0],
           m01 = m[1],
           m02 = m[2],
           m03 = m[3],
           m10 = m[1 * 4 + 0],
           m11 = m[1 * 4 + 1],
           m12 = m[1 * 4 + 2],
           m13 = m[1 * 4 + 3],
           m20 = m[2 * 4 + 0],
           m21 = m[2 * 4 + 1],
           m22 = m[2 * 4 + 2],
           m23 = m[2 * 4 + 3],
           m30 = m[3 * 4 + 0],
           m31 = m[3 * 4 + 1],
           m32 = m[3 * 4 + 2],
           m33 = m[3 * 4 + 3];

    if (m !== dst) {
        dst[0] = m00;
        dst[1] = m01;
        dst[2] = m02;
        dst[3] = m03;
        dst[4] = m10;
        dst[5] = m11;
        dst[6] = m12;
        dst[7] = m13;
        dst[8] = m20;
        dst[9] = m21;
        dst[10] = m22;
        dst[11] = m23;
    }

    dst[12] = m00 * tx + m10 * ty + m20 * tz + m30;
    dst[13] = m01 * tx + m11 * ty + m21 * tz + m31;
    dst[14] = m02 * tx + m12 * ty + m22 * tz + m32;
    dst[15] = m03 * tx + m13 * ty + m23 * tz + m33;

    return dst;
}

function xRotation(angleInRadians: number, dst: Matrix4 = new Matrix4()): Matrix4 {
    const c = Math.cos(angleInRadians),
          s = Math.sin(angleInRadians);

    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = c;
    dst[6] = s;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = -s;
    dst[10] = c;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
}

function xRotate(m: Matrix4, angleInRadians: number, dst: Matrix4 = new Matrix4()): Matrix4 {
    const m10 = m[4],
          m11 = m[5],
          m12 = m[6],
          m13 = m[7],
          m20 = m[8],
          m21 = m[9],
          m22 = m[10],
          m23 = m[11],
          c = Math.cos(angleInRadians),
          s = Math.sin(angleInRadians);

    dst[4] = c * m10 + s * m20;
    dst[5] = c * m11 + s * m21;
    dst[6] = c * m12 + s * m22;
    dst[7] = c * m13 + s * m23;
    dst[8] = c * m20 - s * m10;
    dst[9] = c * m21 - s * m11;
    dst[10] = c * m22 - s * m12;
    dst[11] = c * m23 - s * m13;

    if (m !== dst) {
        dst[0] = m[0];
        dst[1] = m[1];
        dst[2] = m[2];
        dst[3] = m[3];
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }

    return dst;
}

function yRotation(angleInRadians: number, dst: Matrix4 = new Matrix4()): Matrix4 {
    const c = Math.cos(angleInRadians),
          s = Math.sin(angleInRadians);

    dst[0] = c;
    dst[1] = 0;
    dst[2] = -s;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = s;
    dst[9] = 0;
    dst[10] = c;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
}

function yRotate(m: Matrix4, angleInRadians: number, dst: Matrix4 = new Matrix4()): Matrix4 {
    const m00 = m[0 * 4 + 0],
          m01 = m[0 * 4 + 1],
          m02 = m[0 * 4 + 2],
          m03 = m[0 * 4 + 3],
          m20 = m[2 * 4 + 0],
          m21 = m[2 * 4 + 1],
          m22 = m[2 * 4 + 2],
          m23 = m[2 * 4 + 3],
          c = Math.cos(angleInRadians),
          s = Math.sin(angleInRadians);

    dst[0] = c * m00 - s * m20;
    dst[1] = c * m01 - s * m21;
    dst[2] = c * m02 - s * m22;
    dst[3] = c * m03 - s * m23;
    dst[8] = c * m20 + s * m00;
    dst[9] = c * m21 + s * m01;
    dst[10] = c * m22 + s * m02;
    dst[11] = c * m23 + s * m03;

    if (m !== dst) {
        dst[4] = m[4];
        dst[5] = m[5];
        dst[6] = m[6];
        dst[7] = m[7];
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }

    return dst;
}

function zRotation(angleInRadians: number, dst: Matrix4 = new Matrix4()): Matrix4 {
    const c = Math.cos(angleInRadians),
          s = Math.sin(angleInRadians);

    dst[0] = c;
    dst[1] = s;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = -s;
    dst[5] = c;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
}

function zRotate(m: Matrix4, angleInRadians: number, dst: Matrix4 = new Matrix4()): Matrix4 {
    const m00 = m[0 * 4 + 0],
          m01 = m[0 * 4 + 1],
          m02 = m[0 * 4 + 2],
          m03 = m[0 * 4 + 3],
          m10 = m[1 * 4 + 0],
          m11 = m[1 * 4 + 1],
          m12 = m[1 * 4 + 2],
          m13 = m[1 * 4 + 3],
          c = Math.cos(angleInRadians),
          s = Math.sin(angleInRadians);

    dst[0] = c * m00 + s * m10;
    dst[1] = c * m01 + s * m11;
    dst[2] = c * m02 + s * m12;
    dst[3] = c * m03 + s * m13;
    dst[4] = c * m10 - s * m00;
    dst[5] = c * m11 - s * m01;
    dst[6] = c * m12 - s * m02;
    dst[7] = c * m13 - s * m03;

    if (m !== dst) {
        dst[8] = m[8];
        dst[9] = m[9];
        dst[10] = m[10];
        dst[11] = m[11];
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }

    return dst;
}

function axisRotation(axis: Vector3, angleInRadians: number, dst: Matrix4 = new Matrix4()): Matrix4 {
    let x = axis[0],
          y = axis[1],
          z = axis[2];
    const n = Math.sqrt(x * x + y * y + z * z);

    x /= n;
    y /= n;
    z /= n;

    const xx = x * x,
          yy = y * y,
          zz = z * z,
          c = Math.cos(angleInRadians),
          s = Math.sin(angleInRadians),
          oneMinusCosine = 1 - c;

    dst[0] = xx + (1 - xx) * c;
    dst[1] = x * y * oneMinusCosine + z * s;
    dst[2] = x * z * oneMinusCosine - y * s;
    dst[3] = 0;
    dst[4] = x * y * oneMinusCosine - z * s;
    dst[5] = yy + (1 - yy) * c;
    dst[6] = y * z * oneMinusCosine + x * s;
    dst[7] = 0;
    dst[8] = x * z * oneMinusCosine + y * s;
    dst[9] = y * z * oneMinusCosine - x * s;
    dst[10] = zz + (1 - zz) * c;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
}

function axisRotate(m: Matrix4, axis: Vector3, angleInRadians: number, dst: Matrix4 = new Matrix4()): Matrix4 {
    let x = axis[0],
        y = axis[1],
        z = axis[2];
    const n = Math.sqrt(x * x + y * y + z * z);

    x /= n;
    y /= n;
    z /= n;

    const xx = x * x,
          yy = y * y,
          zz = z * z,
          c = Math.cos(angleInRadians),
          s = Math.sin(angleInRadians),
          oneMinusCosine = 1 - c;

    const r00 = xx + (1 - xx) * c,
          r01 = x * y * oneMinusCosine + z * s,
          r02 = x * z * oneMinusCosine - y * s,
          r10 = x * y * oneMinusCosine - z * s,
          r11 = yy + (1 - yy) * c,
          r12 = y * z * oneMinusCosine + x * s,
          r20 = x * z * oneMinusCosine + y * s,
          r21 = y * z * oneMinusCosine - x * s,
          r22 = zz + (1 - zz) * c;

    const m00 = m[0],
          m01 = m[1],
          m02 = m[2],
          m03 = m[3],
          m10 = m[4],
          m11 = m[5],
          m12 = m[6],
          m13 = m[7],
          m20 = m[8],
          m21 = m[9],
          m22 = m[10],
          m23 = m[11];

    dst[0] = r00 * m00 + r01 * m10 + r02 * m20;
    dst[1] = r00 * m01 + r01 * m11 + r02 * m21;
    dst[2] = r00 * m02 + r01 * m12 + r02 * m22;
    dst[3] = r00 * m03 + r01 * m13 + r02 * m23;
    dst[4] = r10 * m00 + r11 * m10 + r12 * m20;
    dst[5] = r10 * m01 + r11 * m11 + r12 * m21;
    dst[6] = r10 * m02 + r11 * m12 + r12 * m22;
    dst[7] = r10 * m03 + r11 * m13 + r12 * m23;
    dst[8] = r20 * m00 + r21 * m10 + r22 * m20;
    dst[9] = r20 * m01 + r21 * m11 + r22 * m21;
    dst[10] = r20 * m02 + r21 * m12 + r22 * m22;
    dst[11] = r20 * m03 + r21 * m13 + r22 * m23;

    if (m !== dst) {
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }

    return dst;
}

function scaling(sx: number, sy: number, sz: number, dst: Matrix4 = new Matrix4()): Matrix4 {
    dst[0] = sx;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = sy;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = sz;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
}

function scale(m: Matrix4, sx: number, sy: number, sz: number, dst: Matrix4 = new Matrix4()): Matrix4 {
    dst[0] = sx * m[0 * 4 + 0];
    dst[1] = sx * m[0 * 4 + 1];
    dst[2] = sx * m[0 * 4 + 2];
    dst[3] = sx * m[0 * 4 + 3];
    dst[4] = sy * m[1 * 4 + 0];
    dst[5] = sy * m[1 * 4 + 1];
    dst[6] = sy * m[1 * 4 + 2];
    dst[7] = sy * m[1 * 4 + 3];
    dst[8] = sz * m[2 * 4 + 0];
    dst[9] = sz * m[2 * 4 + 1];
    dst[10] = sz * m[2 * 4 + 2];
    dst[11] = sz * m[2 * 4 + 3];

    if (m !== dst) {
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }

    return dst;
}

function inverse(m: Matrix4, dst: Matrix4 = new Matrix4()): Matrix4 {
    const m00 = m[0 * 4 + 0],
          m01 = m[0 * 4 + 1],
          m02 = m[0 * 4 + 2],
          m03 = m[0 * 4 + 3],
          m10 = m[1 * 4 + 0],
          m11 = m[1 * 4 + 1],
          m12 = m[1 * 4 + 2],
          m13 = m[1 * 4 + 3],
          m20 = m[2 * 4 + 0],
          m21 = m[2 * 4 + 1],
          m22 = m[2 * 4 + 2],
          m23 = m[2 * 4 + 3],
          m30 = m[3 * 4 + 0],
          m31 = m[3 * 4 + 1],
          m32 = m[3 * 4 + 2],
          m33 = m[3 * 4 + 3],
          tmp_0 = m22 * m33,
          tmp_1 = m32 * m23,
          tmp_2 = m12 * m33,
          tmp_3 = m32 * m13,
          tmp_4 = m12 * m23,
          tmp_5 = m22 * m13,
          tmp_6 = m02 * m33,
          tmp_7 = m32 * m03,
          tmp_8 = m02 * m23,
          tmp_9 = m22 * m03,
          tmp_10 = m02 * m13,
          tmp_11 = m12 * m03,
          tmp_12 = m20 * m31,
          tmp_13 = m30 * m21,
          tmp_14 = m10 * m31,
          tmp_15 = m30 * m11,
          tmp_16 = m10 * m21,
          tmp_17 = m20 * m11,
          tmp_18 = m00 * m31,
          tmp_19 = m30 * m01,
          tmp_20 = m00 * m21,
          tmp_21 = m20 * m01,
          tmp_22 = m00 * m11,
          tmp_23 = m10 * m01;

    const t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
               (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    const t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
               (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    const t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
               (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    const t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
               (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

    const d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

    dst[0] = d * t0;
    dst[1] = d * t1;
    dst[2] = d * t2;
    dst[3] = d * t3;
    dst[4] = d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
        (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
    dst[5] = d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
        (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
    dst[6] = d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
        (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
    dst[7] = d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
        (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
    dst[8] = d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
        (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
    dst[9] = d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
        (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
    dst[10] = d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
        (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
    dst[11] = d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
        (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
    dst[12] = d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
        (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
    dst[13] = d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
        (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
    dst[14] = d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
        (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
    dst[15] = d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
        (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));

    return dst;
}

function transformVector(m: Matrix4, v: Vector4, dst: Vector4 = new Vector4()): Vector4 {
    for (let i = 0; i < 4; ++i) {
        dst[i] = 0.0;
        for (let j = 0; j < 4; ++j) {
            dst[i] += v[j] * m[j * 4 + i];
        }
    }

    return dst;
}

function transformPoint(m: Matrix4, v: Vector3, dst: Vector4 = new Vector4()): Vector4 {
    const v0 = v[0],
          v1 = v[1],
          v2 = v[2],
          d = v0 * m[0 * 4 + 3] + v1 * m[1 * 4 + 3] + v2 * m[2 * 4 + 3] + m[3 * 4 + 3];

    dst[0] = (v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0] + m[3 * 4 + 0]) / d;
    dst[1] = (v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1] + m[3 * 4 + 1]) / d;
    dst[2] = (v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2] + m[3 * 4 + 2]) / d;

    return dst;
}

function transformDirection(m: Matrix4, v: Vector3, dst: Vector4 = new Vector4()): Vector4 {
    const v0 = v[0],
          v1 = v[1],
          v2 = v[2];

    dst[0] = v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0];
    dst[1] = v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1];
    dst[2] = v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2];

    return dst;
}

function transformNormal(m: Matrix4, v: Vector3, dst: Vector3 = new Vector3()): Vector3 {
    const mi = inverse(m),
          v0 = v[0],
          v1 = v[1],
          v2 = v[2];

    dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
    dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
    dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];

    return dst;
}

function copy(src: Matrix4, dst: Matrix4 = new Matrix4()): Matrix4 {
    dst[0] = src[0];
    dst[1] = src[1];
    dst[2] = src[2];
    dst[3] = src[3];
    dst[4] = src[4];
    dst[5] = src[5];
    dst[6] = src[6];
    dst[7] = src[7];
    dst[8] = src[8];
    dst[9] = src[9];
    dst[10] = src[10];
    dst[11] = src[11];
    dst[12] = src[12];
    dst[13] = src[13];
    dst[14] = src[14];
    dst[15] = src[15];

    return dst;
}
