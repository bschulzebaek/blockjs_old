import BlockID from './block-id';

export enum BlockDurability {
    INDESTRUCTIBLE = -1,
    NONE = 0,
}

enum StackSize {
    NONE = -1,
    _1_ = 1,
    _16_ = 16,
    _32_ = 32,
    _64_ = 64
}

interface BlockMetaInterface {
    interactive?: boolean;
    drop?: boolean|number;
    durability: BlockDurability;
    stack: StackSize;
}

const BlockMeta: Record<BlockID, BlockMetaInterface> = {
    [BlockID.OUT_OF_CHUNK]: {
        interactive: false,
        durability: BlockDurability.NONE,
        stack: StackSize.NONE,
        drop: false,
    },
    [BlockID.AIR]: {
        interactive: false,
        durability: BlockDurability.NONE,
        stack: StackSize.NONE,
        drop: false,
    },
    [BlockID.STONE]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.GRASS]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.DIRT]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.COBBLESTONE]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.PLANKS]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.SAPLING]: {
        interactive: false,
        durability: BlockDurability.NONE,
        stack: StackSize._64_,
    },
    [BlockID.BEDROCK]: {
        interactive: false,
        durability: BlockDurability.INDESTRUCTIBLE,
        stack: StackSize._64_,
        drop: false,
    },
    [BlockID.FLOWING_WATER]: {
        interactive: false,
        durability: 0,
        stack: StackSize.NONE,
        drop: false,
    },
    [BlockID.WATER]: {
        interactive: false,
        durability: 0,
        stack: StackSize.NONE,
        drop: false,
    },
    [BlockID.FLOWING_LAVA]: {
        interactive: false,
        durability: 0,
        stack: StackSize.NONE,
        drop: false,
    },
    [BlockID.LAVA]: {
        interactive: false,
        durability: 0,
        stack: StackSize.NONE,
        drop: false,
    },
    [BlockID.SAND]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.GRAVEL]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.GOLD_ORE]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.IRON_ORE]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.COAL_ORE]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.LOG]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.LEAVES]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.SPONGE]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.GLASS]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.LAPIS_ORE]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.LAPIS_BLOCK]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.DISPENSER]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.SANDSTONE]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.NOTEBLOCK]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.BED]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.GOLDEN_RAIL]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.DETECTOR_RAIL]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.STICKY_PISTON]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.WEB]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.TALLGRASS]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.DEADBUSH]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.PISTON]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.PISTON_HEAD]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.WOOL]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.YELLOW_FLOWER]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.RED_FLOWER]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.BROWN_MUSHROOM]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.RED_MUSHROOM]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.GOLD_BLOCK]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.IRON_BLOCK]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.DOUBLE_STONE_SLAB]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.STONE_SLAB]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.BRICK_BLOCK]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.TNT]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.BOOKSHELF]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.MOSSY_COBBLESTONE]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.OBSIDIAN]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.TORCH]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.FIRE]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.MOB_SPAWNER]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.OAK_STAIRS]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.CHEST]: {
        interactive: true,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.REDSTONE_WIRE]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.DIAMOND_ORE]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.DIAMOND_BLOCK]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.CRAFTING_TABLE]: {
        interactive: true,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.WHEAT]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.FARMLAND]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.FURNACE]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.LIT_FURNACE]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.STANDING_SIGN]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.WOODEN_DOOR]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.LADDER]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
    [BlockID.RAIL]: {
        interactive: false,
        durability: 0,
        stack: StackSize._64_,
    },
}

export default BlockMeta