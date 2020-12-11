"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
let seats = [];
let lastHash = '';
let rounds = 0;
let size = {
    rows: 0,
    cols: 0
};
const getAdjacentNum = (row, col) => {
    let num = 0;
    const prevRow = row > 0 ? row - 1 : row;
    const nextRow = row === size.rows - 1 ? row : row + 1;
    const prevCol = col > 0 ? col - 1 : col;
    const nextCol = col === size.cols - 1 ? col : col + 1;
    for (let r = prevRow; r <= nextRow; r++) {
        for (let c = prevCol; c <= nextCol; c++) {
            if (r !== row || c !== col) {
                if (seats[r][c] === '#') {
                    num++;
                }
            }
        }
    }
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
                if (adjacent >= 4) {
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
    size.rows = lines.filter((l) => l.trim() !== '').length;
    lines.forEach((line) => {
        const row = line.trim().split('');
        seats.push(row);
    });
    size.cols = lines[0].length;
    let working = true;
    while (working) {
        working = nextRound();
    }
    return countOccupied(seats);
};
exports.default = start;
