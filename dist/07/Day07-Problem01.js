"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
const colorsTree = new Map();
const colorParents = new Map();
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
        const bag = {
            color: mainColor,
            content: contains,
            allowedColors: []
        };
        colorsTree.set(mainColor, bag);
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
const findColor2 = (colorAsked) => {
    let total = [];
    const colorDetails = colorParents.get(colorAsked);
    if (colorDetails) {
        total = total.concat(colorDetails);
        total = colorDetails.reduce((accum, color) => {
            accum = accum.concat(findColor2(color));
            accum = stripDuplicated(accum);
            return accum;
        }, total);
    }
    return total;
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
    const result = findColor2('shiny gold');
    return result.length;
};
exports.default = start;
