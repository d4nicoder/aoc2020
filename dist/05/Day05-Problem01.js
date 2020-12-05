"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const readLines_1 = __importDefault(require("../readLines"));
const getPassId = (coordinates) => {
    const coords = coordinates.replace(/B/gm, '1').replace(/F/gm, '0').replace(/L/gm, '0').replace(/R/gm, '1');
    return parseInt(coords, 2);
};
const start = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'));
    const ids = lines.map((line) => {
        return getPassId(line);
    });
    ids.sort((a, b) => {
        if (a > b) {
            return -1;
        }
        else if (b > a) {
            return 1;
        }
        return 0;
    });
    return ids[0];
};
exports.default = start;
