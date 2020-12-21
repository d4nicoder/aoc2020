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
    const newGrid = [];
    for (let r = m.length - 1; r >= 0; r--) {
        for (let c = 0; c < m.length; c++) {
            if (r === m.length - 1) {
                newGrid[c] = [];
            }
            newGrid[c][m.length - 1 - r] = m[r][c];
        }
    }
    return newGrid;
};
const rotate = (direction, times, content) => {
    let result = content.map((a) => {
        return a;
    });
    times = times % 4;
    if (times === 0) {
        return content;
    }
    if (direction === -1) {
        // Rotate one time to the other direction
        result = rotate(1, 4 - times, content);
    }
    else {
        // Rotating clockwise n times
        for (let i = 0; i < times; i++) {
            result = rotateBy90(result);
        }
    }
    return result;
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
const getByNeighbours = (maxNeighbours, hasNeighbours, ignoreTiles) => {
    if (!Array.isArray(ignoreTiles)) {
        ignoreTiles = [];
    }
    let candidates = {};
    candidates = hasNeighbours.reduce((accum, tile) => {
        const neighbours = NEIGHBOURS.get(tile.id);
        if (neighbours) {
            for (let i = 0; i < neighbours.length; i++) {
                const n = neighbours[i];
                // Get number of neighbours
                const childNeighbours = NEIGHBOURS.get(n.id);
                if (childNeighbours && childNeighbours.length === maxNeighbours) {
                    if (typeof accum[n.id] === 'undefined') {
                        accum[n.id] = {
                            tile: n,
                            quantity: 1
                        };
                    }
                    else {
                        accum[n.id].quantity += 1;
                    }
                }
            }
        }
        return accum;
    }, {});
    const cnd = Array.from(Object.entries(candidates)).map((tile) => {
        const id = tile[1].tile.id;
        // @ts-ignore
        for (let i = 0; i < ignoreTiles.length; i++) {
            // @ts-ignore
            if (ignoreTiles[i].id === id) {
                tile[1].quantity = 0;
            }
        }
        return tile;
    }).sort((a, b) => {
        if (a[1].quantity > b[1].quantity) {
            return -1;
        }
        else if (a[1].quantity < b[1].quantity) {
            return 1;
        }
        return 0;
    }).map((t) => t[1].tile);
    return cnd[0];
};
const arrangeAll = () => {
    // Get one square
    const squares = Array.from(NEIGHBOURS.entries()).filter((item) => {
        return item[1].length === 2;
    }).map((item) => item[0]);
    // get one square
    let topLeft = null;
    Array.from(NEIGHBOURS.values()).forEach((tile) => {
        for (const n of tile) {
            if (n.id === squares[0]) {
                topLeft = n;
            }
        }
    });
    const choosen = [];
    const matrix = [];
    for (let r = 0; r < SQUARE_LENGTH; r++) {
        matrix[r] = Array(SQUARE_LENGTH);
        for (let c = 0; c < SQUARE_LENGTH; c++) {
            if (r === 0 && c === 0) {
                // top left corner
                if (topLeft) {
                    matrix[r][c] = topLeft;
                }
            }
            else if (r === 0 && c === SQUARE_LENGTH - 1) {
                // Top right corner, find tile that is corner and neighbour from matrix[r][c-1]
                matrix[r][c] = getByNeighbours(2, [matrix[r][c - 1]], choosen);
            }
            else if (r === SQUARE_LENGTH - 1 && c === 0) {
                // Bottom left corner, find tile that is corner and neighbour from matrix[r-1][0]
                matrix[r][c] = getByNeighbours(2, [matrix[r - 1][0]], choosen);
            }
            else if (r === SQUARE_LENGTH - 1 && c === SQUARE_LENGTH - 1) {
                // Bottom right corner. Find tile that is corner and neighbour from matrix[r][c-1]
                matrix[r][c] = getByNeighbours(2, [matrix[r - 1][c], matrix[r][c - 1]], choosen);
            }
            else if (c === 0) {
                // Left wall. Find tile neighbour from matrix[r-1][0] and have 3 neighbours
                matrix[r][c] = getByNeighbours(3, [matrix[r - 1][c]], choosen);
            }
            else if (c === SQUARE_LENGTH - 1) {
                // Right wall. Find tile neighbour from matrix[r-1][c] and have 3 neighbours
                matrix[r][c] = getByNeighbours(3, [matrix[r - 1][c], matrix[r][c - 1]], choosen);
            }
            else if (r === 0) {
                // Top. Find tile the is neighbour from matrix[r][c-1] and have 3 neighbours
                matrix[r][c] = getByNeighbours(3, [matrix[r][c - 1]], choosen);
            }
            else if (r === SQUARE_LENGTH - 1) {
                // Bottom row. Find tile that is neighbour from matrix[r][c-1] and matrix[r-1][c]
                matrix[r][c] = getByNeighbours(3, [matrix[r][c - 1], matrix[r - 1][c]], choosen);
            }
            else {
                // Middle zone. Find tile that is neighbour from matrix[r][c-1] and matrix[r-1][c]
                matrix[r][c] = getByNeighbours(4, [matrix[r][c - 1], matrix[r - 1][c]], choosen);
            }
            choosen.push(matrix[r][c]);
        }
    }
    return matrix;
};
const getRightBorder = (content) => {
    return content.reduce((accum, row) => {
        accum += row[row.length - 1];
        return accum;
    }, '');
};
const getLeftBorder = (content) => {
    return content.reduce((accum, row) => {
        accum += row[0];
        return accum;
    }, '');
};
const getTopBorder = (content) => {
    return content[0].join('');
};
const getBottomBorder = (content) => {
    return content[content.length - 1].join('');
};
const fixFlipVertically = (previous, content) => {
    const prevBorder = getBottomBorder(previous);
    const actualBorder = getTopBorder(content);
    if (prevBorder !== actualBorder) {
        return flipVertically(content);
    }
    else {
        return content;
    }
};
const fixRotation = (reference, content, first) => {
    const refP = reference;
    const conP = content;
    if (first) {
        // We have to rotate 0x0 (reference) to be aligned with 0x1 (source)
        let right = getRightBorder(reference);
        let left = getLeftBorder(content);
        if (right === left) {
            return [reference, content];
        }
        for (let r1 = 0; r1 < 2; r1++) {
            for (let r2 = 0; r2 < 2; r2++) {
                for (let i = 0; i < 4; i++) {
                    reference = rotate(1, 1, reference);
                    right = getRightBorder(reference);
                    if (right === left) {
                        return [reference, content];
                    }
                    for (let j = 0; j < 4; j++) {
                        content = rotate(1, 1, content);
                        left = getLeftBorder(content);
                        if (right === left) {
                            return [reference, content];
                        }
                    }
                }
                content = flipVertically(content);
            }
            reference = flipVertically(reference);
        }
    }
    else {
        // We have to rotate content to be
        const right = getRightBorder(reference);
        let left = getLeftBorder(content);
        if (right === left) {
            return [reference, content];
        }
        for (let r = 0; r < 2; r++) {
            for (let i = 0; i < 4; i++) {
                content = rotate(1, 1, content);
                left = getLeftBorder(content);
                if (right === left) {
                    return [reference, content];
                }
            }
            content = flipVertically(content);
        }
    }
    return [refP, conP];
};
const renderImage = (source) => {
    const matrix = [];
    for (let r = 0; r < source.length; r++) {
        const accum = [];
        const row = source[r];
        for (let c = 0; c < row.length; c++) {
            const tile = row[c];
            // getting tile content
            let content = TILES.get(row[c].id) || [];
            if (r === 0 && c === 0) {
                // Top left, ensure correct borders: known edges on right and bottom
                const bottomEdge = getBottomBorder(content);
                const edgeData = EDGES.get(bottomEdge);
                if (edgeData && edgeData.length === 2) {
                    content = flipVertically(content);
                }
            }
            if (c === 0) {
                let next = TILES.get(row[c + 1].id) || [];
                const nextTile = row[c + 1];
                if (nextTile.flipV) {
                    next = flipVertically(next);
                }
                else if (nextTile.flipH) {
                    next = flipHorizontally(next);
                }
                let res = fixRotation(content, next, true);
                content = res[0];
                TILES.set(row[c].id, content);
                TILES.set(row[c + 1].id, res[1]);
            }
            else {
                const before = TILES.get(row[c - 1].id) || [];
                let res = fixRotation(before, content, false);
                content = res[1];
                TILES.set(row[c].id, res[1]);
            }
            let newTile = true;
            if (r > 0) {
                const prev = TILES.get(source[r - 1][c].id) || [];
                content = fixFlipVertically(prev, content);
            }
            accum.push(content);
        }
        for (let r = 1; r < 9; r++) {
            const line = accum.reduce((ac, content) => {
                const l = content[r].slice(1, -1);
                ac += l.join('');
                return ac;
            }, '');
            matrix.push(line);
        }
    }
    return matrix;
};
const findTheFuckingMonster = (mat) => {
    let monsters = 0;
    //                O....OO....OO....OOO
    const expBody = /^#.{4}##.{4}##.{4}###/;
    //                O..  O..  O..  O..  O..  O
    const expLegs = /^#.{2}#.{2}#.{2}#.{2}#.{2}#/;
    for (let i = 0; i < mat.length - 1; i++) {
        // Find monster head
        for (let c = 18; c < mat[i].length; c++) {
            if (mat[i][c] === '#') {
                // Looking for next row
                const next = mat[i + 1].join('');
                const str = next.substr(c - 18);
                if (expBody.test(str)) {
                    // Looking for legs
                    const legs = mat[i + 2].join('').substr(c - 17);
                    if (expLegs.test(legs)) {
                        monsters++;
                    }
                }
            }
        }
    }
    return monsters;
};
const performSearch = (matrix) => {
    let finalMat = matrix.map((line) => line.split(''));
    let monsters = findTheFuckingMonster(finalMat);
    if (monsters > 0) {
        return monsters;
    }
    for (let f = 0; f < 2; f++) {
        finalMat = flipVertically(finalMat);
        monsters = findTheFuckingMonster(finalMat);
        if (monsters > 0) {
            return monsters;
        }
        for (let i = 0; i < 4; i++) {
            finalMat = rotate(1, 1, finalMat);
            monsters = findTheFuckingMonster(finalMat);
            if (monsters > 0) {
                return monsters;
            }
        }
    }
    return -1;
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
    const mat = arrangeAll();
    const repeated = [];
    const used = [];
    mat.forEach((row) => {
        for (const tile of row) {
            if (used.indexOf(tile.id) >= 0) {
                repeated.push(tile.id);
            }
            else {
                used.push(tile.id);
            }
        }
    });
    const matrix = renderImage(mat);
    const monsters = performSearch(matrix);
    const totalHashtags = matrix.reduce((accum, line) => {
        const m = line.match(/#/g);
        if (m) {
            accum += m.length;
        }
        return accum;
    }, 0);
    const finalResult = totalHashtags - (monsters * 15);
    return finalResult;
};
exports.default = main;
