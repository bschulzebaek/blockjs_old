import BlockID from '../../data/block-id';

export default interface BlockInterface {
    id: BlockID;
    data?: any;
    continentalness?: number;
    erosion?: number;
    peaksValleys?: number;
    humidity?: number;
    temperature?: number;
}