import { createNoise2D } from 'simplex-noise';
import { iterateChunk3D } from '../../utility/iterate-chunk-coords';
import Chunk, { BlockMap } from '../../../chunk/Chunk';
import BlockID from '../../../../data/block-id';
import Alea from 'alea';
import { BASE_SURFACE_HEIGHT, BEDROCK_LEVEL, NOISE_FACTOR, SPLINE_POINTS } from './configuration';

import Spline from './Spline';

const spContinentalness = new Spline(SPLINE_POINTS.CONTINENTALNESS.x, SPLINE_POINTS.CONTINENTALNESS.y);
const spErosion = new Spline(SPLINE_POINTS.EROSION.x, SPLINE_POINTS.EROSION.y);
// const spPeaksValleys = new Spline(SPLINE_POINTS.PEAKS_VALLEYS.x, SPLINE_POINTS.PEAKS_VALLEYS.y);

// @ts-ignore
function getTerrainHeight(continentalness: number, erosion: number, peaksValleys: number) {
    let th = BASE_SURFACE_HEIGHT;

    th += Math.floor(th * spContinentalness.at(continentalness));
    th = Math.floor(th * spErosion.at(erosion));
    // th += Math.floor(th * spPeaksValleys.at(peaksValleys));

    return Math.floor(th);
}

function getBlockForY(y: number, surfaceY: number) {
    if (y > surfaceY) {
        return BlockID.AIR;
    } else if (y === 0) {
        return BlockID.BEDROCK;
    } else if (y <= BEDROCK_LEVEL) {
        return Math.round(Math.random()) ? BlockID.STONE : BlockID.BEDROCK;
    } else {
        return BlockID.STONE;
    }
}

export default function shapeTerrain(seed: string, chunkX: number, chunkZ: number, blocks: BlockMap) {
    const absoluteX = chunkX * Chunk.WIDTH,
        absoluteZ = chunkZ * Chunk.LENGTH;

    const noise2dContinentalness = createNoise2D(Alea(seed + '-c')),
        noise2dErosion = createNoise2D(Alea(seed + '-e')),
        noise2dPeaksValleys = createNoise2D(Alea(seed + '-pv')),
        noise2dHumidity = createNoise2D(Alea(seed + '-h')),
        noise2dTemperature = createNoise2D(Alea(seed + 't'));

    const blockNoise = createNoise2D(Alea(seed));

    iterateChunk3D((x: number, y: number, z: number) => {
        const blockX = (absoluteX + x) * NOISE_FACTOR,
            blockZ = (absoluteZ + z) * NOISE_FACTOR,
            noise2d = blockNoise(blockX, blockZ),
            continentalness = (noise2dContinentalness(blockX, blockZ) + 1) / 2,
            erosion = noise2dErosion(blockX, blockZ),
            peaksValleys =noise2dPeaksValleys(blockX, blockZ);

        const terrainHeight = getTerrainHeight(
            continentalness,
            erosion,
            peaksValleys,
        );

        const surfaceY = terrainHeight + noise2d * 4;

        blocks.set(Chunk.getBlockPosition(x, y, z), {
            id: getBlockForY(y, surfaceY),
            continentalness,
            erosion,
            peaksValleys,
            humidity: Math.round(noise2dHumidity(blockX, blockZ) * 100) / 100,
            temperature: Math.round(noise2dTemperature(x, z) * 100) / 100,
        });
    });
}