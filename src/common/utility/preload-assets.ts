import getAssetUrl from './get-asset-url'

const ASSET_SOURCES = [
    'textures.png',
    'texture_steve.png',
    'skybox/mc_bk.png',
    'skybox/mc_dn.png',
    'skybox/mc_ft.png',
    'skybox/mc_lf.png',
    'skybox/mc_rt.png',
    'skybox/mc_up.png',
];

function loadAsset(src: string) {
    return new Promise((resolve) => {
        const image = new Image();
        image.src = getAssetUrl(src);

        image.addEventListener('load', () => {
            resolve(image);
        });
    });
}

ASSET_SOURCES.forEach(loadAsset);