"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const checkLetterTimes = (password, letter, min, max) => {
    const regex = new RegExp(letter, 'g');
    const results = password.match(regex);
    const foundedTimes = !results ? 0 : results.length;
    return (min <= foundedTimes && max >= foundedTimes);
};
const parseLine = (line) => {
    const regex = /^(\d+)-(\d+)\s(\w):\s([\w]+)$/;
    const lineData = line.match(regex);
    if (!lineData) {
        throw new Error('Bad line format');
    }
    return {
        min: parseInt(lineData[1], 10),
        max: parseInt(lineData[2], 10),
        letter: lineData[3],
        password: lineData[4]
    };
};
const start = async () => {
    const inputFile = await fs_1.default.promises.readFile(path_1.default.join(__dirname, 'input.txt'));
    const inputFileData = inputFile.toString().split('\n').filter((line) => line.trim() !== '');
    const validPasswords = inputFileData.map((line) => {
        let data;
        try {
            data = parseLine(line);
        }
        catch (e) {
            console.error(`${line} password info invalid`);
            data = null;
        }
        return data;
    }).filter((lineData) => {
        if (!lineData) {
            return false;
        }
        return checkLetterTimes(lineData.password, lineData.letter, lineData.min, lineData.max);
    });
    return validPasswords.length;
};
exports.default = start;
