"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
const TILES = new Map();
const EDGES = new Map();
const NEIGHBOURS = new Map();
let SQUARE_LENGTH = 0;
const flipVertically = (content) => {
    return content.reverse();
};
const flipHorizontally = (content) => {
    return content.map((line) => {
        return line.reverse();
    });
};
const rotateBy90 = (m) => {
    const length = m.length;
    //for each layer of the matrix
    for (let first = 0; first < length >> 1; first++) {
        let last = length - 1 - first;
        for (let i = first; i < last; i++) {
            let top = m[first][i]; //store top
            m[first][i] = m[last - i][first]; //top = left
            m[last - i][first] = m[last][last - i]; //left = bottom
            m[last][last - i] = m[i][last]; //bottom = right
            m[i][last] = top; //right = top
        }
    }
    return m;
};
const rotate = (direction, times, content) => {
    // direction == 1 clockwise
    // direction == -1 reverse clockwise
    times = times % 4;
    if (times === 0) {
        return content;
    }
    if (times === 3 && direction === -1) {
        // Rotate one time to the other direction
        return rotate(1, 1, content);
    }
    else if (times === 2) {
        // flip vertically and horizontally
        const flipV = flipVertically(content);
        return flipHorizontally(flipV);
    }
    else {
        // Rotating clockwise n times
        let result = content;
        for (let i = 0; i < times; i++) {
            result = rotateBy90(result);
        }
        return result;
    }
};
const saveEdge = (content, id, rotated, flipV, flipH) => {
    if (!EDGES.has(content)) {
        EDGES.set(content, [{
                id,
                rotated,
                flipV,
                flipH
            }]);
    }
    else {
        const edge = EDGES.get(content);
        if (edge) {
            // avoid duplicated ids
            for (let i = 0; i < edge.length; i++) {
                if (edge[i].id === id) {
                    return;
                }
            }
            edge.push({
                id,
                rotated,
                flipV: flipV,
                flipH: flipH
            });
            EDGES.set(content, edge);
        }
    }
};
const storeEdges = (id, tile) => {
    let content;
    // Normal edge
    content = tile[0].join('');
    saveEdge(content, id, 0, false, false);
    // Rotate 90
    content = rotate(1, 1, tile)[0].join('');
    saveEdge(content, id, 1, false, false);
    // Rotate 180
    content = rotate(1, 2, tile)[0].join('');
    saveEdge(content, id, 1, false, false);
    // Rotate 270
    content = rotate(1, 3, tile)[0].join('');
    saveEdge(content, id, 1, false, false);
    // flippedH
    const flippedH = flipHorizontally(tile);
    saveEdge(flippedH[0].join(''), id, 0, false, true);
    // FlippedH rotate 90
    content = rotate(1, 1, flippedH)[0].join('');
    saveEdge(content, id, 1, false, true);
    // FlippedH rotate 180
    content = rotate(1, 2, flippedH)[0].join('');
    saveEdge(content, id, 2, false, true);
    // FlippedH rotate 270
    content = rotate(1, 3, flippedH)[0].join('');
    saveEdge(content, id, 3, false, true);
    // flippedV
    const flippedV = flipVertically(tile);
    saveEdge(flippedV[0].join(''), id, 0, true, false);
    // FlippedH rotate 90
    content = rotate(1, 1, flippedV)[0].join('');
    saveEdge(content, id, 1, true, false);
    // FlippedH rotate 180
    content = rotate(1, 2, flippedV)[0].join('');
    saveEdge(content, id, 2, true, false);
    // FlippedH rotate 270
    content = rotate(1, 3, flippedV)[0].join('');
    saveEdge(content, id, 3, true, false);
};
const saveNeighbour = (id, edges) => {
    if (NEIGHBOURS.has(id)) {
        const data = NEIGHBOURS.get(id);
        if (data) {
            for (let i = 0; i < edges.length; i++) {
                let found = false;
                for (let j = 0; j < data.length; j++) {
                    if (data[j].id === edges[i].id) {
                        found = true;
                    }
                }
                if (!found) {
                    data.push(edges[i]);
                }
            }
            NEIGHBOURS.set(id, data);
        }
    }
    else {
        NEIGHBOURS.set(id, edges);
    }
};
const calculateNeighbours = () => {
    Array.from(EDGES.entries()).forEach((edge) => {
        for (let i = 0; i < edge[1].length; i++) {
            const current = edge[1][i];
            const rest = edge[1].filter((e, idx) => idx !== i);
            saveNeighbour(current.id, rest);
        }
    });
};
const main = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'));
    let lastId = -1;
    let actualContent = [];
    for (let line of lines) {
        if (/^Tile/.test(line)) {
            if (actualContent.length > 0) {
                TILES.set(lastId, actualContent);
            }
            const id = line.split(' ')[1].replace(':', '');
            lastId = parseInt(id, 10);
            actualContent = [];
        }
        else {
            actualContent.push(line.split(''));
        }
    }
    TILES.set(lastId, actualContent);
    Array.from(TILES.entries()).forEach((tile) => {
        storeEdges(tile[0], tile[1]);
    });
    calculateNeighbours();
    SQUARE_LENGTH = Math.sqrt(TILES.size);
    // Tiles with 3 neighbours are on squares
    return Array.from(NEIGHBOURS.entries()).reduce((accum, entry) => {
        if (entry[1].length === 2) {
            accum *= entry[0];
        }
        return accum;
    }, 1);
};
exports.default = main;
