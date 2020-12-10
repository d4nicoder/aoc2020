"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
let lastOrder = [];
let finalVoltaje = 0;
const processLine = (previous, line) => {
    const diff = line - previous;
    if (diff > 3) {
        return -1;
    }
    return line;
};
let checked = new Map();
const getCombinations = (collection, position) => {
    let value = 0;
    if (position === collection.length - 1) {
        return 1;
    }
    if (checked.has(position)) {
        const stored = checked.get(position);
        if (stored) {
            return stored;
        }
    }
    for (let i = position + 1; i < collection.length; i++) {
        if (collection[i] - collection[position] <= 3) {
            value += getCombinations(collection, i);
        }
    }
    checked.set(position, value);
    return value;
};
const start = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'));
    const linesNumber = lines.map((line) => parseInt(line, 10));
    linesNumber.sort((a, b) => {
        if (a > b) {
            return 1;
        }
        else if (a < b) {
            return -1;
        }
        return 0;
    });
    let previous = 0;
    let ended = false;
    for (let i = 0; i < linesNumber.length; i++) {
        const line = linesNumber[i];
        if (processLine(previous, line) < 0) {
            finalVoltaje = linesNumber[i - 1] + 3;
            ended = true;
        }
        if (!ended) {
            lastOrder.push(line);
            previous = line;
        }
    }
    finalVoltaje = linesNumber[linesNumber.length - 1] + 3;
    const completeArray = Array(1).fill(0).concat(lastOrder).concat([finalVoltaje]);
    return getCombinations(completeArray, 0);
};
exports.default = start;
