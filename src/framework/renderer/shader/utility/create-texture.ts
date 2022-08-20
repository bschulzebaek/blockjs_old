import getAssetUrl from '../../../../utility/get-asset-url';
import Container from '../../../Container';

const width = 1;
const height = 1;
const border = 0;
const pixel = new Uint8Array([0, 0, 255, 255]);

const REGISTRY: Record<string, WebGLTexture> = {};

function loadTextureAsync(url: string, callback: (img: HTMLImageElement) => void) {
    const image = new Image();

    image.onload = () => {
        callback(image);
    };

    image.src = url;
}

export default function createTexture(assetPath: string): WebGLTexture {
    // TODO: This approach will lead to a loose texture object after leaving a game!
    // if (REGISTRY[assetPath]) {
    //     return REGISTRY[assetPath];
    // }

    const context = Container.getContext();

    const {
        TEXTURE_2D, RGBA, UNSIGNED_BYTE, TEXTURE_MAG_FILTER, TEXTURE_MIN_FILTER, NEAREST,
        LINEAR_MIPMAP_LINEAR, TEXTURE_WRAP_S, TEXTURE_WRAP_T, CLAMP_TO_EDGE
    } = context;

    const texture = context.createTexture()!;

    context.bindTexture(TEXTURE_2D, texture);
    context.texImage2D(TEXTURE_2D, 0, RGBA, width, height, border, RGBA, UNSIGNED_BYTE, pixel);
    context.bindTexture(TEXTURE_2D, null);

    loadTextureAsync(getAssetUrl(assetPath), (img) => {
        context.bindTexture(TEXTURE_2D, texture);

        context.texImage2D(TEXTURE_2D, 0, RGBA, RGBA, UNSIGNED_BYTE, img);
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