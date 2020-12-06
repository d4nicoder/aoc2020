"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
const getGroupsAnswers = (lines) => {
    const groupsAnswers = [];
    let tempAnswers = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === '') {
            // new group
            groupsAnswers.push(tempAnswers.length);
            tempAnswers = [];
        }
        const answers = lines[i].split('').filter((letter) => tempAnswers.indexOf(letter) < 0);
        tempAnswers = tempAnswers.concat(answers);
    }
    return groupsAnswers;
};
const getTotalAnswers = (answers) => {
    return answers.reduce((accum, item) => {
        accum += item;
        return accum;
    }, 0);
};
const start = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'), true);
    const groupsAnswers = getGroupsAnswers(lines);
    return getTotalAnswers(groupsAnswers);
};
exports.default = start;
