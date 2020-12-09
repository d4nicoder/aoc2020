"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
const findSum = (collection, position, preamble) => {
    const targetNumber = collection[position];
    const validCollection = collection.slice(position - preamble, position);
    for (let i = 0; i < validCollection.length; i++) {
        const first = validCollection[i];
        for (let j = i + 1; j < validCollection.length; j++) {
            const second = validCollection[j];
            if (first + second === targetNumber) {
                return true;
            }
        }
    }
    return false;
};
const findContiguous = (collection, start, targetNumber) => {
    let sum = [];
    for (let i = start; i < collection.length; i++) {
        const num = collection[i];
        sum.push(num);
        const result = sum.reduce((accum, n) => {
            accum += n;
            return accum;
        }, 0);
        if (result === targetNumber) {
            sum.sort();
            return sum[0] + sum[sum.length - 1];
        }
        else if (result > targetNumber) {
            return findContiguous(collection, start + 1, targetNumber);
        }
    }
    return -1;
};
const start = async () => {
    const file = 'input.txt';
    const preamble = 25;
    const lines = await readLines_1.default(path_1.default.join(__dirname, file));
    const numbers = lines.map((line) => parseInt(line, 10));
    let target = 0;
    for (let i = preamble; i < numbers.length; i++) {
        if (!findSum(numbers, i, preamble)) {
            target = numbers[i];
        }
    }
    const hack = findContiguous(numbers, 0, target);
    return hack;
};
exports.default = start;
