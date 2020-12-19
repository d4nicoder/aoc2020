"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
const rules = new Map();
const computedRules = new Map();
const messages = [];
const letter = /[ab]/;
const pipe = /\|/;
const parseLine = (line) => {
    if (/^\d+:/.test(line)) {
        // Its a rule
        const [index, rule] = line.split(':');
        rules.set(parseInt(index, 10), rule.trim());
    }
    else {
        // its content
        messages.push(line.trim());
    }
};
const processRule = (value) => {
    if (computedRules.has(value)) {
        const r = computedRules.get(value);
        if (r) {
            return r;
        }
    }
    let computedResult = '';
    if (pipe.test(value)) {
        const items = value.split(' | ').map(i => i.trim());
        computedResult = `(${processRule(items[0])}|${processRule(items[1])})`;
    }
    else if (letter.test(value)) {
        computedResult = value.replace(/"/gm, '');
    }
    else {
        const items = value.split(' ');
        computedResult = items.map((i) => {
            const val = rules.get(parseInt(i, 10)) || '';
            return processRule(val);
        }).join('');
    }
    computedRules.set(value, computedResult);
    return computedResult;
};
const main = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'));
    lines.forEach((line) => {
        parseLine(line);
    });
    const root = rules.get(0) || '';
    const a = new RegExp(`^${processRule(root)}$`);
    return messages.reduce((accum, m) => {
        if (a.test(m)) {
            accum += 1;
        }
        return accum;
    }, 0);
};
exports.default = main;
main().then((result) => {
    console.log(`Result ${result}`);
}).catch(console.error);
