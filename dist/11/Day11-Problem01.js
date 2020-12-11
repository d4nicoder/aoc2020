"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
let seats = [];
let lastHash = '';
let rounds = 0;
const getAdyacentNum = (row, col) => {
    let num = 0;
    const prevRow = row > 0 ? row - 1 : row;
    const nextRow = row === seats.length - 1 ? row : row + 1;
    const prevCol = col > 0 ? col - 1 : col;
    const nextCol = col === seats[0].length - 1 ? col : col + 1;
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
    let matrix = '';
    for (let r = 0; r < seats.length; r++) {
        for (let c = 0; c < seats[r].length; c++) {
            const itemType = seats[r][c];
            const adjacent = getAdyacentNum(r, c);
            if (itemType === 'L') {
                if (adjacent === 0) {
                    // Becomes occupied
                    matrix += '#';
                }
                else {
                    matrix += 'L';
                }
            }
            else if (itemType === '#') {
                if (adjacent >= 4) {
                    matrix += 'L';
                }
                else {
                    matrix += '#';
                }
            }
            else {
                matrix += '.';
            }
        }
        matrix += '\n';
    }
    const tempSeats = convertMatrix(matrix);
    const hash = getHash(tempSeats);
    if (lastHash !== hash) {
        lastHash = hash;
        rounds++;
        seats = tempSeats;
        return true;
    }
    return false;
};
const countOccupied = (matrix) => {
    const occupied = matrix.reduce((accum, item) => {
        const m = item.join(',').match(/#/gm);
        if (m) {
            accum += m.length;
        }
        return accum;
    }, 0);
    return occupied;
};
const getHash = (matrix) => {
    const str = matrix.reduce((accum, row) => {
        accum += row.join(',') + ',';
        return accum;
    }, '');
    return crypto_1.default.createHash('md5').update(str).digest('hex');
};
const convertMatrix = (matrix) => {
    const mat = [];
    matrix.split('\n').forEach((line) => {
        if (line.trim() !== '') {
            const row = line.trim().split('');
            mat.push(row);
        }
    });
    return mat;
};
const start = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'));
    lines.forEach((line) => {
        const row = line.trim().split('');
        seats.push(row);
    });
    let working = true;
    while (working) {
        working = nextRound();
    }
    return countOccupied(seats);
};
exports.default = start;
