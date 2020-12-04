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
const bgRed = '\x1b[41m';
const fgYellow = '\x1b[33m';
const fgRed = '\x1b[31m';
const reset = '\x1b[0m';
const runAll = async () => {
    const welcome = await fs_1.default.promises.readFile(path_1.default.join(__dirname, 'welcome.txt'));
    console.log(welcome.toString());
    const start = new Date();
    try {
        console.log(`    - Day 1, problem 1: ${await Day01_Problem01_1.default()}`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        console.log(`    - Day 1, problem 2: ${await Day01_Problem02_1.default()}`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        console.log(`    - Day 2, problem 1: ${await Day02_Problem01_1.default()}`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        console.log(`    - Day 2, problem 2: ${await Day02_Problem02_1.default()}`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        console.log(`    - Day 3, problem 1: ${await Day03_Problem01_1.default()}`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        console.log(`    - Day 3, problem 2: ${await Day03_Problem02_1.default()}`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        console.log(`    - Day 4, problem 1: ${await Day04_Problem01_1.default()}`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        console.log(`    - Day 4, problem 2: ${await Day04_Problem02_1.default()}`);
    }
    catch (e) {
        console.error(e);
    }
    console.log('\n***********************************************************************\n');
    const end = new Date();
    console.log(`Total time elapsed: ${end.getTime() - start.getTime()} ms`);
};
runAll().catch(console.error);
