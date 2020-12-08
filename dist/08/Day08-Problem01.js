"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
const linesReaded = new Map();
let accumulator = 0;
const parseLine = (line, lineNumber) => {
    const regexp = /^([a-z]{3}) ([+\-\d]+)$/;
    const matched = line.match(regexp);
    if (matched) {
        const details = {
            lineNumber,
            action: matched[1],
            value: parseInt(matched[2], 10),
            accumulator: 0,
            executedTimes: 0
        };
        linesReaded.set(lineNumber, details);
        return details;
    }
};
const runLine = (lineNumber) => {
    const line = linesReaded.get(lineNumber);
    if (line) {
        if (line.executedTimes === 1) {
            return;
        }
        line.executedTimes += 1;
        linesReaded.set(lineNumber, line);
        switch (line.action) {
            case 'jmp':
                runLine(lineNumber + line.value);
                break;
            case 'acc':
                accumulator += line.value;
                runLine(lineNumber + 1);
                break;
            case 'nop':
                runLine(lineNumber + 1);
        }
    }
};
const start = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'));
    lines.forEach((line, index) => {
        parseLine(line, index);
    });
    runLine(0);
    return accumulator;
};
exports.default = start;
