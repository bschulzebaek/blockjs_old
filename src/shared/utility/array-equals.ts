type TypedArray =
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array
    | Float64Array;

export default function arrayEquals(a: TypedArray, b: TypedArray) {
    return a !== undefined &&
           b !== undefined &&
           a.length === b.length &&
           a.every((value, index) => value === b[index]);
}