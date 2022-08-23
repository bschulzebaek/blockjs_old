import BlockID from './block-id';

export enum BlockDurability {
    INDESTRUCTIBLE = -1,
    NONE = 0,
}

interface BlockMetaInterface {
    interactive?: boolean;
    durability: BlockDurability;
}

const BlockMeta: Record<BlockID, BlockMetaInterface> = {
    [BlockID.OUT_OF_CHUNK]: {
        interactive: false,
        durability: BlockDurability.NONE,
    },
    [BlockID.AIR]: {
        interactive: false,
        durability: BlockDurability.NONE,
    },
    [BlockID.STONE]: {
        interactive: false,
        durability: 0
    },
    [BlockID.GRASS]: {
        interactive: false,
        durability: 0
    },
    [BlockID.DIRT]: {
        interactive: false,
        durability: 0
    },
    [BlockID.COBBLESTONE]: {
        interactive: false,
        durability: 0
    },
    [BlockID.PLANKS]: {
        interactive: false,
        durability: 0
    },
    [BlockID.SAPLING]: {
        interactive: false,
        durability: BlockDurability.NONE,
    },
    [BlockID.BEDROCK]: {
        interactive: false,
        durability: BlockDurability.INDESTRUCTIBLE,
    },
    [BlockID.FLOWING_WATER]: {
        interactive: false,
        durability: 0
    },
    [BlockID.WATER]: {
        interactive: false,
        durability: 0
    },
    [BlockID.FLOWING_LAVA]: {
        interactive: false,
        durability: 0
    },
    [BlockID.LAVA]: {
        interactive: false,
        durability: 0
    },
    [BlockID.SAND]: {
        interactive: false,
        durability: 0
    },
    [BlockID.GRAVEL]: {
        interactive: false,
        durability: 0
    },
    [BlockID.GOLD_ORE]: {
        interactive: false,
        durability: 0
    },
    [BlockID.IRON_ORE]: {
        interactive: false,
        durability: 0
    },
    [BlockID.COAL_ORE]: {
        interactive: false,
        durability: 0
    },
    [BlockID.LOG]: {
        interactive: false,
        durability: 0
    },
    [BlockID.LEAVES]: {
        interactive: false,
        durability: 0
    },
    [BlockID.SPONGE]: {
        interactive: false,
        durability: 0
    },
    [BlockID.GLASS]: {
        interactive: false,
        durability: 0
    },
    [BlockID.LAPIS_ORE]: {
        interactive: false,
        durability: 0
    },
    [BlockID.LAPIS_BLOCK]: {
        interactive: false,
        durability: 0
    },
    [BlockID.DISPENSER]: {
        interactive: false,
        durability: 0
    },
    [BlockID.SANDSTONE]: {
        interactive: false,
        durability: 0
    },
    [BlockID.NOTEBLOCK]: {
        interactive: false,
        durability: 0
    },
    [BlockID.BED]: {
        interactive: false,
        durability: 0
    },
    [BlockID.GOLDEN_RAIL]: {
        interactive: false,
        durability: 0
    },
    [BlockID.DETECTOR_RAIL]: {
        interactive: false,
        durability: 0
    },
    [BlockID.STICKY_PISTON]: {
        interactive: false,
        durability: 0
    },
    [BlockID.WEB]: {
        interactive: false,
        durability: 0
    },
    [BlockID.TALLGRASS]: {
        interactive: false,
        durability: 0
    },
    [BlockID.DEADBUSH]: {
        interactive: false,
        durability: 0
    },
    [BlockID.PISTON]: {
        interactive: false,
        durability: 0
    },
    [BlockID.PISTON_HEAD]: {
        interactive: false,
        durability: 0
    },
    [BlockID.WOOL]: {
        interactive: false,
        durability: 0
    },
    [BlockID.YELLOW_FLOWER]: {
        interactive: false,
        durability: 0
    },
    [BlockID.RED_FLOWER]: {
        interactive: false,
        durability: 0
    },
    [BlockID.BROWN_MUSHROOM]: {
        interactive: false,
        durability: 0
    },
    [BlockID.RED_MUSHROOM]: {
        interactive: false,
        durability: 0
    },
    [BlockID.GOLD_BLOCK]: {
        interactive: false,
        durability: 0
    },
    [BlockID.IRON_BLOCK]: {
        interactive: false,
        durability: 0
    },
    [BlockID.DOUBLE_STONE_SLAB]: {
        interactive: false,
        durability: 0
    },
    [BlockID.STONE_SLAB]: {
        interactive: false,
        durability: 0
    },
    [BlockID.BRICK_BLOCK]: {
        interactive: false,
        durability: 0
    },
    [BlockID.TNT]: {
        interactive: false,
        durability: 0
    },
    [BlockID.BOOKSHELF]: {
        interactive: false,
        durability: 0
    },
    [BlockID.MOSSY_COBBLESTONE]: {
        interactive: false,
        durability: 0
    },
    [BlockID.OBSIDIAN]: {
        interactive: false,
        durability: 0
    },
    [BlockID.TORCH]: {
        interactive: false,
        durability: 0
    },
    [BlockID.FIRE]: {
        interactive: false,
        durability: 0
    },
    [BlockID.MOB_SPAWNER]: {
        interactive: false,
        durability: 0
    },
    [BlockID.OAK_STAIRS]: {
        interactive: false,
        durability: 0
    },
    [BlockID.CHEST]: {
        interactive: true,
        durability: 0
    },
    [BlockID.REDSTONE_WIRE]: {
        interactive: false,
        durability: 0
    },
    [BlockID.DIAMOND_ORE]: {
        interactive: false,
        durability: 0
    },
    [BlockID.DIAMOND_BLOCK]: {
        interactive: false,
        durability: 0
    },
    [BlockID.CRAFTING_TABLE]: {
        interactive: true,
        durability: 0
    },
    [BlockID.WHEAT]: {
        interactive: false,
        durability: 0
    },
    [BlockID.FARMLAND]: {
        interactive: false,
        durability: 0
    },
    [BlockID.FURNACE]: {
        interactive: false,
        durability: 0
    },
    [BlockID.LIT_FURNACE]: {
        interactive: false,
        durability: 0
    },
    [BlockID.STANDING_SIGN]: {
        interactive: false,
        durability: 0
    },
    [BlockID.WOODEN_DOOR]: {
        interactive: false,
        durability: 0
    },
    [BlockID.LADDER]: {
        interactive: false,
        durability: 0
    },
    [BlockID.RAIL]: {
        interactive: false,
        durability: 0
    },
}

export default BlockMeta