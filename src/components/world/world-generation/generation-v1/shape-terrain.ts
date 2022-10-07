import { createNoise2D } from 'simplex-noise';
import { iterateChunk3D } from '../../utility/iterate-chunk-coords';
import Chunk, { BlockMap } from '../../../chunk/Chunk';
import BlockID from '../../../../data/block-id';
import Alea from 'alea';
import { BASE_SURFACE_HEIGHT, BEDROCK_LEVEL, NOISE_FACTOR } from './configuration';

// @ts-ignore
function getTerrainHeight(continentalness: number, erosion: number, peaksValleys: number) {
    return Math.floor(
        applyPeaksValleys(
            // applyErosion(
                applyContinentalness(
                    BASE_SURFACE_HEIGHT,
                    continentalness
                ),
            //     erosion
            // ),
            peaksValleys,
        ),
    );
}

function applyContinentalness(height: number, value: number) {
    if (value > 0.7) {
        return height + value * 11;
    } else if (value > 0.3) {
        return height + value * 5
    } else if (value < -0.85) {
        return height + value * 11;
    } else {
        return height + value * 2
    }
}

// @ts-ignore
function applyErosion(height: number, value: number) {
    if (value < -0.7) {
        return height / (value + 1);
    } else if (value < -0.3) {
        return height / (value + 0.7);
    } else if (value < -0.2) {
        return height / (value / 2 + 1);
    } else if (value >= -0.2 && value < 0.1) {
        return height * (value + 0.2);
    } else if (value < 0.4) {
        return height * (value - 0.05);
    } else if (value < 0.6) {
        return height * (value - 0.1);
    } else if (value < 0.65) {
        return height * (value + 0.3);
    } else if (value < 0.75) {
        return height * (value + 1.0);
    } else if (value < 0.8) {
        return height * (value - 0.7);
    } else if (value < 0.95) {
        return height * (value - 1.0);
    } else {
        return 0;
    }
}

function applyPeaksValleys(height: number, value: number) {
    return height * (value + 2) / 2;
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
            continentalness = Math.round(noise2dContinentalness(blockX, blockZ) * 100) / 100,
            erosion = Math.round(noise2dErosion(blockX, blockZ) * 100) / 100,
            peaksValleys = Math.round(noise2dPeaksValleys(blockX, blockZ) * 100) / 100;

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