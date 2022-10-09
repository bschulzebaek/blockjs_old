export const CHUNK_HEIGHT = 64;
export const BASE_SURFACE_HEIGHT = CHUNK_HEIGHT / 2;
export const SEA_LEVEL = BASE_SURFACE_HEIGHT - 3;
export const BEDROCK_LEVEL = 4;
export const NOISE_FACTOR = 0.005;

export const SPLINE_POINTS = {
    CONTINENTALNESS: {
        x: [0,   0.05, 0.1,  0.2,   0.4,  0.51, 0.52, 0.53, 0.55,  0.72, 0.9, 0.92, 0.95, 1.0],
        y: [0.1, 0.1,  0.15, 0.185, 0.21, 0.3,  0.32, 0.4,  0.425, 0.45, 0.5, 0.6,  0.8,  0.92],
    },
    EROSION: {
        x: [0,   0.15, 0.35, 0.37, 0.5,  0.65, 0.72, 0.75, 0.8, 0.85, 0.9,  1.0],
        y: [0.9, 0.8,  0.7,  0.75, 0.52, 0.5,  0.5,  0.6,  0.6, 0.5,  0.45, 0.45],
    },
    PEAKS_VALLEYS: {
        x: [0, 0.05, 0.1, 0.35, 0.4, 0.7, 0.9, 1.0],
        y: [],
    }
}