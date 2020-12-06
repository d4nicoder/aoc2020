"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
const getGroupsResponses = (lines) => {
    const groupsResponses = [];
    let tempResponses = new Map();
    let peopleInGroup = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === '') {
            // new group
            let validResponses = 0;
            for (let letter of Array.from(tempResponses.keys())) {
                const times = tempResponses.get(letter);
                if (times && times === peopleInGroup) {
                    validResponses++;
                }
            }
            groupsResponses.push(validResponses);
            tempResponses = new Map();
            peopleInGroup = 0;
        }
        else {
            const responses = lines[i].split('');
            for (let r = 0; r < responses.length; r++) {
                const letter = responses[r];
                if (tempResponses.has(letter)) {
                    const times = tempResponses.get(letter);
                    if (typeof times === 'number') {
                        tempResponses.set(letter, times + 1);
                    }
                }
                else {
                    tempResponses.set(letter, 1);
                }
            }
            peopleInGroup++;
        }
    }
    return groupsResponses;
};
const getTotalResponses = (answers) => {
    return answers.reduce((accum, item) => {
        accum += item;
        return accum;
    }, 0);
};
const start = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'), true);
    const groupsResponses = getGroupsResponses(lines);
    return getTotalResponses(groupsResponses);
};
exports.default = start;
