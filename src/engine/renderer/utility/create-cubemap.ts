import getAssetUrl from '../../../shared/utility/get-asset-url';

const width = 1;
const height = 1;
const border = 0;
const pixel = new Uint8Array([0, 0, 255, 255]);

async function loadTextureAsync(url: string, callback: (img: ImageBitmap) => void) {
    const response = await fetch(url),
          blob = await response.blob();

    callback(await createImageBitmap(blob));
}

export default function createCubemap(context: WebGL2RenderingContext, faces: string[]): WebGLTexture {
    const {
        TEXTURE_CUBE_MAP, TEXTURE_CUBE_MAP_POSITIVE_X, RGBA, UNSIGNED_BYTE, TEXTURE_MAG_FILTER, TEXTURE_MIN_FILTER,
        LINEAR, TEXTURE_WRAP_S, TEXTURE_WRAP_T, TEXTURE_WRAP_R, CLAMP_TO_EDGE
    } = context;

    const texture = context.createTexture();

    const srcFormat = context.RGBA;
    const srcType = context.UNSIGNED_BYTE;

    context.bindTexture(context.TEXTURE_CUBE_MAP, texture);

    faces.forEach((face, index) => {
        context.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + index, 0, RGBA, width, height, border, srcFormat, srcType, pixel);

        loadTextureAsync(getAssetUrl(face), (bitmap) => {
            context.bindTexture(context.TEXTURE_CUBE_MAP, texture);

            context.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + index, 0, RGBA, RGBA, UNSIGNED_BYTE, bitmap);

            context.bindTexture(TEXTURE_CUBE_MAP, null);
        });
    });

    context.texParameteri(TEXTURE_CUBE_MAP, TEXTURE_MAG_FILTER, LINEAR);
    context.texParameteri(TEXTURE_CUBE_MAP, TEXTURE_MIN_FILTER, LINEAR);
    context.texParameteri(TEXTURE_CUBE_MAP, TEXTURE_WRAP_S, CLAMP_TO_EDGE);
    context.texParameteri(TEXTURE_CUBE_MAP, TEXTURE_WRAP_T, CLAMP_TO_EDGE);
    context.texParameteri(TEXTURE_CUBE_MAP, TEXTURE_WRAP_R, CLAMP_TO_EDGE);

    context.bindTexture(TEXTURE_CUBE_MAP, null);

    return texture!;
}