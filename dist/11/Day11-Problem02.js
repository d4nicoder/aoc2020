"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
let seats = [];
let rounds = 0;
let lastHash = '';
const size = {
    rows: 0,
    cols: 0
};
const findDirection = (collection, row, rowDirection, col, colDirection) => {
    let found = 0;
    if (row < 0) {
        return found;
    }
    if (col < 0) {
        return found;
    }
    if (row >= collection.length) {
        return found;
    }
    if (col >= collection[0].length) {
        return found;
    }
    if (collection[row][col] === '.') {
        return findDirection(collection, row + rowDirection, rowDirection, col + colDirection, colDirection);
    }
    return collection[row][col] === '#' ? 1 : 0;
};
const getAdjacentNum = (row, col) => {
    let num = 0;
    num += findDirection(seats, row - 1, -1, col - 1, -1);
    // up
    num += findDirection(seats, row - 1, -1, col, 0);
    // up right
    num += findDirection(seats, row - 1, -1, col + 1, 1);
    // left
    num += findDirection(seats, row, 0, col - 1, -1);
    // right
    num += findDirection(seats, row, 0, col + 1, 1);
    // down left
    num += findDirection(seats, row + 1, 1, col - 1, -1);
    // down
    num += findDirection(seats, row + 1, 1, col, 0);
    // down right
    num += findDirection(seats, row + 1, 1, col + 1, 1);
    return num;
};
const nextRound = () => {
    let matrix = [];
    for (let r = 0; r < size.rows; r++) {
        const row = [];
        for (let c = 0; c < size.cols; c++) {
            const itemType = seats[r][c];
            const adjacent = getAdjacentNum(r, c);
            if (itemType === 'L') {
                if (adjacent === 0) {
                    // Becomes occupied
                    row.push('#');
                }
                else {
                    row.push('L');
                }
            }
            else if (itemType === '#') {
                if (adjacent >= 5) {
                    row.push('L');
                }
                else {
                    row.push('#');
                }
            }
            else {
                row.push('.');
            }
        }
        matrix.push(row);
    }
    const hash = getHash(matrix);
    if (lastHash !== hash) {
        lastHash = hash;
        rounds++;
        seats = matrix;
        return true;
    }
    return false;
};
const countOccupied = (matrix) => {
    return matrix.reduce((accum, item) => {
        const m = item.join(',').match(/#/gm);
        if (m) {
            accum += m.length;
        }
        return accum;
    }, 0);
};
const getHash = (matrix) => {
    return matrix.reduce((accum, row) => {
        accum += row.join(',') + ',';
        return accum;
    }, '');
};
const start = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'));
    size.rows = lines.filter(line => line.trim() !== '').length;
    lines.forEach((line) => {
        const row = line.trim().split('');
        seats.push(row);
    });
    size.cols = seats[0].length;
    let working = true;
    while (working) {
        working = nextRound();
    }
    return countOccupied(seats);
};
exports.default = start;
