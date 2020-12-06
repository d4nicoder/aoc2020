"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
const getGroupsAnswers = (lines) => {
    const groupsAnswers = [];
    let tempAnswers = new Map();
    let peopleInGroup = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === '') {
            // new group
            let validAnswers = 0;
            for (let letter of Array.from(tempAnswers.keys())) {
                const times = tempAnswers.get(letter);
                if (times && times === peopleInGroup) {
                    validAnswers++;
                }
            }
            groupsAnswers.push(validAnswers);
            tempAnswers = new Map();
            peopleInGroup = 0;
        }
        else {
            const answers = lines[i].split('');
            for (let r = 0; r < answers.length; r++) {
                const letter = answers[r];
                if (tempAnswers.has(letter)) {
                    const times = tempAnswers.get(letter);
                    if (typeof times === 'number') {
                        tempAnswers.set(letter, times + 1);
                    }
                }
                else {
                    tempAnswers.set(letter, 1);
                }
            }
            peopleInGroup++;
        }
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
