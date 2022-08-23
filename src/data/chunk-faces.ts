enum ChunkDirections {
    NORTH = 0,
    EAST = 1,
    SOUTH = 2,
    WEST = 3,
    UP = 4,
    DOWN = 5
}

const ChunkFaces = [
    {
        n: [0, 0, -1],
        nOffset: false,
        v: [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0]
    },
    {
        n: [-1, 0, 0],
        nOffset: false,
        v: [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0]
    },
    {
        n: [0, 0, 1],
        nOffset: true,
        v: [0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0]
    },
    {
        n: [1, 0, 0],
        nOffset: true,
        v: [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1]
    },
    {
        n: [0, 1, 0],
        nOffset: true,
        v: [0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0]
    },
    {
        n: [0, -1, 0],
        nOffset: false,
        v: [0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1]
    }
];

const ChunkUV =  [0, 1, 1, 1, 1, 0, 0, 0];

const ChunkIndex = [0, 1, 2, 2, 3, 0];

export {
    ChunkDirections,
    ChunkFaces,
    ChunkUV,
    ChunkIndex
}