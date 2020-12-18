"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
const evaluate = (sentence) => {
    const splittedSentence = sentence.split('');
    let lastNum = 0;
    let lastOperand = '+';
    for (let i = 0; i < splittedSentence.length; i++) {
        const item = splittedSentence[i].trim();
        if (item === '') {
        }
        else if (item === '(') {
            // Start parenthesis. Look for the closer parenthesis, and evaluate inside
            let level = 1;
            let newSentence = '';
            let j = i + 1;
            while (level > 0) {
                if (splittedSentence[j] === '(') {
                    level += 1;
                }
                else if (splittedSentence[j] === ')') {
                    level -= 1;
                    if (level === 0) {
                        const parenthesisValue = evaluate(newSentence);
                        if (lastOperand === '+') {
                            lastNum = lastNum + parenthesisValue;
                        }
                        else if (lastOperand === '*') {
                            lastNum = lastNum * parenthesisValue;
                        }
                        i = j + 1;
                    }
                }
                newSentence += splittedSentence[j];
                j++;
            }
        }
        else if (/^\d+$/.test(item)) {
            const num = parseInt(item, 10);
            if (lastOperand === '+') {
                lastNum = lastNum + num;
            }
            else if (lastOperand === '*') {
                lastNum = lastNum * num;
            }
        }
        else if (/^[+*]$/.test(item)) {
            lastOperand = item;
        }
    }
    return lastNum;
};
const main = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'));
    let results = [];
    lines.forEach((line) => {
        results.push(evaluate(line));
    });
    return results.reduce((accum, res) => {
        accum += res;
        return accum;
    }, 0);
};
exports.default = main;
