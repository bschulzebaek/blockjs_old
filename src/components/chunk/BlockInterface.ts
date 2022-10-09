import BlockID from '../../data/block-id';
import LightLevel from '../../framework/light/LightLevel';

export default interface BlockInterface {
    id: BlockID;
    data?: any;
    continentalness?: number;
    erosion?: number;
    peaksValleys?: number;
    humidity?: number;
    temperature?: number;
    lightLevel?: LightLevel;
}