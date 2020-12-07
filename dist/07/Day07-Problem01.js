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
        line.split('contain')[1].split(',').forEach((part, index) => {
            const details = part.match(regexpContains);
            if (details) {
                contains.push({
                    quantity: parseInt(details[1], 10),
                    color: details[2]
                });
            }
        });
        const bag = {
            color: mainColor,
            content: contains,
            allowedColors: []
        };
        colorsTree.set(mainColor, bag);
    }
};
const findColor = (colorAsked) => {
    return Array.from(colorsTree.values()).filter((bag) => (bag.allowedColors.indexOf(colorAsked) >= 0)).length;
};
const getAllowedColors = (line) => {
    const allowedColors = line.content.reduce((accum, content) => {
        accum = accum.concat([content.color]);
        if (colorsTree.has(content.color)) {
            const bag = colorsTree.get(content.color);
            if (bag) {
                accum = accum.concat(getAllowedColors(bag));
            }
        }
        return accum;
    }, []);
    return allowedColors;
};
const start = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'));
    lines.forEach((line) => {
        parseLine(line);
    });
    Array.from(colorsTree.keys()).forEach((color) => {
        const bag = colorsTree.get(color);
        if (bag) {
            bag.allowedColors = getAllowedColors(bag);
            colorsTree.set(bag.color, bag);
        }
    });
    const result = findColor('shiny gold');
    return result;
};
exports.default = start;
