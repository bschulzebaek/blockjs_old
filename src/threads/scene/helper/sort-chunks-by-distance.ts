import { distance, Vector3 } from '../../../shared/math';

export default function sortChunksByDistance(ids: string[], center: Vector3) {
    return ids.sort((a, b) => {
        const [xA, zA] = a.split(':'),
            [xB, zB] = b.split(':');

        const dA = distance(
            new Vector3(parseInt(xA), 0, parseInt(zA)),
            center,
        );

        const dB = distance(
            new Vector3(parseInt(xB), 0, parseInt(zB)),
            center,
        );

        if (dA < dB) {
            return -1
        } else if (dA > dB) {
            return 1;
        } else {
            return 0
        }
    })
}