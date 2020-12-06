"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
const getGroupsResponses = (lines) => {
    const groupsResponses = [];
    let tempResponses = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === '') {
            // new group
            groupsResponses.push(tempResponses.length);
            tempResponses = [];
        }
        const responses = lines[i].split('').filter((letter) => tempResponses.indexOf(letter) < 0);
        tempResponses = tempResponses.concat(responses);
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
