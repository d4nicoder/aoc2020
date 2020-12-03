"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const parseArray = (inputText) => {
    const lines = inputText.split('\n').filter((line) => line.trim() !== '');
    return lines.map((line) => {
        const lineArr = line.replace(/\./gm, '0').replace(/#/gm, '1').split('');
        return lineArr.map((item) => parseInt(item, 10));
    });
};
const findTrees = (rows, right, down) => {
    let column = 0;
    let trees = 0;
    let i = 0;
    while (i < rows.length) {
        if (column >= rows[i].length) {
            column = column - rows[i].length;
        }
        trees += rows[i][column];
        column += right;
        i += down;
    }
    return trees;
};
const start = async () => {
    const inputData = await fs_1.default.promises.readFile(path_1.default.join(__dirname, 'input.txt'));
    const parsedArray = parseArray(inputData.toString());
    const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
    return slopes.reduce((accum, slope) => {
        const trees = findTrees(parsedArray, slope[0], slope[1]);
        return accum * trees;
    }, 1);
};
exports.default = start;
