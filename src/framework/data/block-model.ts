import BlockID from './block-id';

// https://minecraft-ids.grahamedgecombe.com/

// NORTH EAST SOUTH WEST UP DOWN

const BlockUV: Record<string, [number, number, number, number, number, number, number, number, number, number, number, number]> = {
    [BlockID.STONE]: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [BlockID.GRASS]: [3, 0, 3, 0, 3, 0, 3, 0, 0, 0, 2, 0],
    [BlockID.DIRT]: [2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0],
    [BlockID.COBBLESTONE]: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [BlockID.PLANKS]: [4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0],
    [BlockID.SAPLING]: [15, 0, 15, 0, 15, 0, 15, 0, 15, 0, 15, 0],
    [BlockID.BEDROCK]: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [BlockID.FLOWING_WATER]: [14, 0, 14, 0, 14, 0, 14, 0, 14, 0, 14, 0],
    [BlockID.WATER]: [14, 0, 14, 0, 14, 0, 14, 0, 14, 0, 14, 0],
    [BlockID.FLOWING_LAVA]: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
    [BlockID.LAVA]: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
    [BlockID.SAND]: [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
    [BlockID.GRAVEL]: [3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1],
    [BlockID.GOLD_ORE]: [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2],
    [BlockID.IRON_ORE]: [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
    [BlockID.COAL_ORE]: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [BlockID.LOG]: [4, 1, 4, 1, 4, 1, 4, 1, 5, 1, 5, 1],
    [BlockID.LEAVES]: [4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3],
    [BlockID.SPONGE]: [0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3],
    [BlockID.GLASS]: [1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3],
    [BlockID.LAPIS_ORE]: [0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10],
    [BlockID.LAPIS_BLOCK]: [0, 9, 0, 9, 0, 9, 0, 9, 0, 9, 0, 9],
    [BlockID.DISPENSER]: [14, 2, 13, 2, 13, 2, 13, 2, 14, 3, 14, 3],
    [BlockID.SANDSTONE]: [0, 12, 0, 12, 0, 12, 0, 12, 0, 11, 0, 13],
    [BlockID.NOTEBLOCK]: [10, 4, 10, 4, 10, 4, 10, 4, 10, 4, 10, 4],
    [BlockID.BED + ':1']: [5, 9, 6, 9, 6, 9, 6, 9, 6, 8, 0, 4],
    [BlockID.BED + ':2']: [5, 9, 7, 9, 8, 9, 7, 9, 7, 8, 0, 4],


    [BlockID.WEB]: [11, 0, 11, 0, 11, 0, 11, 0, 11, 0, 11, 0],


    [BlockID.WOOL]: [0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4],


    [BlockID.STONE_SLAB]: [5, 0, 5, 0, 5, 0, 5, 0, 6, 0, 6, 0],


    [BlockID.BOOKSHELF]: [3, 2, 3, 2, 3, 2, 3, 2, 4, 0, 4, 0],


    [BlockID.CHEST]: [11, 1, 10, 1, 10, 1, 10, 1, 9, 1, 9, 1],


    [BlockID.CRAFTING_TABLE]: [12, 3, 11, 3, 12, 3, 11, 3, 11, 2, 11, 2],


    [BlockID.WOODEN_DOOR + ':1']: [1, 5, 4, 0, 1, 5, 4, 0, 4, 0, 4, 0],
    [BlockID.WOODEN_DOOR + ':2']: [1, 6, 4, 0, 1, 6, 4, 0, 4, 0, 4, 0],
}

export default BlockUV;