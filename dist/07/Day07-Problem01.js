"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
const colorParents = new Map();
const parseLine = (line) => {
    const regExpPrimaryColor = /^(.*) bags contain/;
    const matched = line.match(regExpPrimaryColor);
    if (matched) {
        const mainColor = matched[1];
        const regexpContains = /([\d]+) (.*) bag[s]?/;
        line.split('contain')[1].split(',').forEach((part) => {
            const details = part.match(regexpContains);
            if (details) {
                // store the parents
                if (colorParents.has(details[2])) {
                    const colorP = colorParents.get(details[2]);
                    if (colorP) {
                        if (colorP.indexOf(mainColor) < 0) {
                            colorP.push(mainColor);
                        }
                        colorParents.set(details[2], colorP);
                    }
                }
                else {
                    colorParents.set(details[2], [mainColor]);
                }
            }
        });
    }
};
const stripDuplicated = (colors) => {
    const finalColors = [];
    colors.forEach((color) => {
        if (finalColors.indexOf(color) < 0) {
            finalColors.push(color);
        }
    });
    return finalColors;
};
const findColor = (colorAsked) => {
    let total = [];
    const colorDetails = colorParents.get(colorAsked);
    if (colorDetails) {
        total = total.concat(colorDetails);
        total = colorDetails.reduce((accum, color) => {
            accum = accum.concat(findColor(color));
            accum = stripDuplicated(accum);
            return accum;
        }, total);
    }
    return total;
};
const start = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'));
    lines.forEach((line) => {
        parseLine(line);
    });
    const result = findColor('shiny gold');
    return result.length;
};
exports.default = start;
