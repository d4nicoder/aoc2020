"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Day01_Problem01_1 = __importDefault(require("./01/Day01-Problem01"));
const Day01_Problem02_1 = __importDefault(require("./01/Day01-Problem02"));
const Day02_Problem01_1 = __importDefault(require("./02/Day02-Problem01"));
const Day02_Problem02_1 = __importDefault(require("./02/Day02-Problem02"));
const Day03_Problem01_1 = __importDefault(require("./03/Day03-Problem01"));
const Day03_Problem02_1 = __importDefault(require("./03/Day03-Problem02"));
const Day04_Problem01_1 = __importDefault(require("./04/Day04-Problem01"));
const Day04_Problem02_1 = __importDefault(require("./04/Day04-Problem02"));
const Day05_Problem01_1 = __importDefault(require("./05/Day05-Problem01"));
const Day05_Problem02_1 = __importDefault(require("./05/Day05-Problem02"));
const Day06_Problem01_1 = __importDefault(require("./06/Day06-Problem01"));
const Day06_Problem02_1 = __importDefault(require("./06/Day06-Problem02"));
const Day07_Problem01_1 = __importDefault(require("./07/Day07-Problem01"));
const Day07_Problem02_1 = __importDefault(require("./07/Day07-Problem02"));
const Day08_Problem01_1 = __importDefault(require("./08/Day08-Problem01"));
const Day08_Problem02_1 = __importDefault(require("./08/Day08-Problem02"));
const bgRed = '\x1b[41m';
const fgYellow = '\x1b[33m';
const fgRed = '\x1b[31m';
const reset = '\x1b[0m';
const getTimeElapsed = (startTime) => {
    return Date.now() - startTime.getTime();
};
const runAll = async () => {
    const welcome = await fs_1.default.promises.readFile(path_1.default.join(__dirname, 'welcome.txt'));
    console.log(welcome.toString());
    const start = new Date();
    try {
        const startProblem01 = new Date();
        console.log(`    - Day 1, problem 1: ${await Day01_Problem01_1.default()} (${getTimeElapsed(startProblem01)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem01b = new Date();
        console.log(`    - Day 1, problem 2: ${await Day01_Problem02_1.default()} (${getTimeElapsed(startProblem01b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem02 = new Date();
        console.log(`    - Day 2, problem 1: ${await Day02_Problem01_1.default()} (${getTimeElapsed(startProblem02)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem02b = new Date();
        console.log(`    - Day 2, problem 2: ${await Day02_Problem02_1.default()} (${getTimeElapsed(startProblem02b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem03 = new Date();
        console.log(`    - Day 3, problem 1: ${await Day03_Problem01_1.default()} (${getTimeElapsed(startProblem03)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem03b = new Date();
        console.log(`    - Day 3, problem 2: ${await Day03_Problem02_1.default()} (${getTimeElapsed(startProblem03b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem04 = new Date();
        console.log(`    - Day 4, problem 1: ${await Day04_Problem01_1.default()} (${getTimeElapsed(startProblem04)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem04b = new Date();
        console.log(`    - Day 4, problem 2: ${await Day04_Problem02_1.default()} (${getTimeElapsed(startProblem04b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem05 = new Date();
        console.log(`    - Day 5, problem 1: ${await Day05_Problem01_1.default()} (${getTimeElapsed(startProblem05)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem05b = new Date();
        console.log(`    - Day 5, problem 2: ${await Day05_Problem02_1.default()} (${getTimeElapsed(startProblem05b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem06 = new Date();
        console.log(`    - Day 6, problem 1: ${await Day06_Problem01_1.default()} (${getTimeElapsed(startProblem06)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem06b = new Date();
        console.log(`    - Day 6, problem 2: ${await Day06_Problem02_1.default()} (${getTimeElapsed(startProblem06b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem07 = new Date();
        console.log(`    - Day 7, problem 1: ${await Day07_Problem01_1.default()} (${getTimeElapsed(startProblem07)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem07b = new Date();
        console.log(`    - Day 7, problem 2: ${await Day07_Problem02_1.default()} (${getTimeElapsed(startProblem07b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem08 = new Date();
        console.log(`    - Day 8, problem 1: ${await Day08_Problem01_1.default()} (${getTimeElapsed(startProblem08)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem08b = new Date();
        console.log(`    - Day 8, problem 2: ${await Day08_Problem02_1.default()} (${getTimeElapsed(startProblem08b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    console.log('\n***********************************************************************\n');
    const end = new Date();
    console.log(`Total time elapsed: ${end.getTime() - start.getTime()} ms`);
};
runAll().catch(console.error);
