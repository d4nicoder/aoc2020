"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
const differences = {
    1: 0,
    2: 0,
    3: 1
};
const processLine = (previous, line) => {
    const diff = line - previous;
    if (diff > 3) {
        return -1;
    }
    switch (diff) {
        case 1:
            differences[1] += 1;
            break;
        case 2:
            differences[2] += 1;
            break;
        case 3:
            differences[3] += 1;
            break;
    }
    return line;
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
    let result = -1;
    let previous = 0;
    for (let i = 0; i < linesNumber.length; i++) {
        const line = linesNumber[i];
        if (processLine(previous, line) < 0) {
            result = differences[1] * differences[3];
            console.log(differences);
            return result;
        }
        previous = line;
    }
    return differences[1] * differences[3];
};
exports.default = start;
