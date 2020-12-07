"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
const colorsTree = new Map();
const parseLine = (line) => {
    const regExpPrimaryColor = /^(.*) bags contain/;
    const matched = line.match(regExpPrimaryColor);
    if (matched) {
        const mainColor = matched[1];
        const regexpContains = /([\d]+) (.*) bag[s]?/;
        const contains = [];
        line.split('contain')[1].split(',').forEach((part) => {
            const details = part.match(regexpContains);
            if (details) {
                contains.push({
                    quantity: parseInt(details[1], 10),
                    color: details[2],
                });
            }
        });
        const bag = {
            color: mainColor,
            content: contains
        };
        colorsTree.set(mainColor, bag);
    }
};
const findChilds = (colorAsked) => {
    let childs = 0;
    const details = colorsTree.get(colorAsked);
    if (details) {
        childs = details.content.reduce((accum, color) => {
            accum += color.quantity + (findChilds(color.color) * color.quantity);
            return accum;
        }, 0);
    }
    return childs;
};
const start = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'));
    lines.forEach((line) => {
        parseLine(line);
    });
    return findChilds('shiny gold');
};
exports.default = start;
