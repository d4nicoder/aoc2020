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
const findTrees = (rows) => {
    let column = 0;
    let trees = 0;
    for (let i = 0; i < rows.length; i++) {
        if (column >= rows[i].length) {
            column = column - rows[i].length;
        }
        trees += rows[i][column];
        column += 3;
    }
    return trees;
};
const start = async () => {
    const inputData = await fs_1.default.promises.readFile(path_1.default.join(__dirname, 'input.txt'));
    const parsedArray = parseArray(inputData.toString());
    return findTrees(parsedArray);
};
exports.default = start;
