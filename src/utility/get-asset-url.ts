export default function(assetName: string): string {
    return new URL(`../assets/${assetName}`, import.meta.url).href;
}