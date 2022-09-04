import getAssetUrl from '../../../shared/utility/get-asset-url';

const width = 1;
const height = 1;
const border = 0;
const pixel = new Uint8Array([0, 0, 255, 255]);

const REGISTRY: Record<string, WebGLTexture> = {};

async function loadTextureAsync(url: string, callback: (img: ImageBitmap) => void) {
    const response = await fetch(url),
        blob = await response.blob();

    callback(await createImageBitmap(blob));
}

export default function createTexture(context: WebGL2RenderingContext, assetPath: string): WebGLTexture {
    const {
        TEXTURE_2D, RGBA, UNSIGNED_BYTE, TEXTURE_MAG_FILTER, TEXTURE_MIN_FILTER, NEAREST,
        LINEAR_MIPMAP_LINEAR, TEXTURE_WRAP_S, TEXTURE_WRAP_T, CLAMP_TO_EDGE
    } = context;

    const texture = context.createTexture()!;

    context.bindTexture(TEXTURE_2D, texture);
    context.texImage2D(TEXTURE_2D, 0, RGBA, width, height, border, RGBA, UNSIGNED_BYTE, pixel);
    context.bindTexture(TEXTURE_2D, null);

    loadTextureAsync(getAssetUrl(assetPath), (bitmap) => {
        context.bindTexture(TEXTURE_2D, texture);

        context.texImage2D(TEXTURE_2D, 0, RGBA, RGBA, UNSIGNED_BYTE, bitmap);
        context.texParameteri(TEXTURE_2D, TEXTURE_MAG_FILTER, NEAREST);
        context.texParameteri(TEXTURE_2D, TEXTURE_MIN_FILTER, LINEAR_MIPMAP_LINEAR);
        context.texParameteri(TEXTURE_2D, TEXTURE_WRAP_S, CLAMP_TO_EDGE);
        context.texParameteri(TEXTURE_2D, TEXTURE_WRAP_T, CLAMP_TO_EDGE);
        context.generateMipmap(TEXTURE_2D);

        context.bindTexture(TEXTURE_2D, null);
    });

    REGISTRY[assetPath] = texture;

    return texture;
}