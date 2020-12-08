"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
const linesReaded = new Map();
let accumulator = 0;
let lastLine = 0;
const executionOrder = [];
let finished = false;
let programFinished = false;
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
    if (!finished) {
        executionOrder.push(lineNumber);
    }
    const line = linesReaded.get(lineNumber);
    if (line) {
        if (line.executedTimes === 1) {
            return -1;
        }
        line.executedTimes += 1;
        linesReaded.set(lineNumber, line);
        switch (line.action) {
            case 'jmp':
                lastLine = lineNumber;
                return runLine(lineNumber + line.value);
            case 'acc':
                accumulator += line.value;
                lastLine = lineNumber;
                return runLine(lineNumber + 1);
            case 'nop':
                lastLine = lineNumber;
                return runLine(lineNumber + 1);
            default:
                return -1;
        }
    }
    else {
        programFinished = true;
        return 0;
    }
};
const resetExecutions = () => {
    Array.from(linesReaded.keys()).forEach((num) => {
        const l = linesReaded.get(num);
        if (l) {
            l.executedTimes = 0;
            linesReaded.set(num, l);
        }
    });
    accumulator = 0;
};
const tryFix = (lineNumber) => {
    const line = linesReaded.get(lineNumber);
    if (line) {
        if (line.action === 'jmp') {
            line.action = 'nop';
            linesReaded.set(lineNumber, line);
            resetExecutions();
            const ret = runLine(0);
            if (ret !== 0) {
                line.action = 'jmp';
                linesReaded.set(lineNumber, line);
                return -1;
            }
            return 0;
        }
        else if (line.action === 'nop' && line.value !== 0) {
            line.action = 'jmp';
            linesReaded.set(lineNumber, line);
            resetExecutions();
            const ret = runLine(0);
            if (ret !== 0) {
                line.action = 'nop';
                linesReaded.set(lineNumber, line);
                return -1;
            }
            return 0;
        }
    }
    return -1;
};
const start = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'));
    lines.forEach((line, index) => {
        parseLine(line, index);
    });
    runLine(0);
    finished = true;
    while (!programFinished && executionOrder.length > 0) {
        const [ll] = executionOrder.splice(0, 1);
        if (tryFix(ll) === 0) {
            programFinished = true;
        }
    }
    return accumulator;
};
exports.default = start;
