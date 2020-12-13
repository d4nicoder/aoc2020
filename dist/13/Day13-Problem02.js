"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
/**
 * Start point
 */
const main = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'));
    const departuresMap = lines[1].split(',').map((id, index) => {
        return {
            id: id,
            offset: index
        };
    }).filter((bus) => bus.id !== 'x');
    let minTime = 0;
    let product = 1;
    // We look for this constrain: (t + offset) % busId === 0 (for each bus)
    departuresMap.forEach((bus) => {
        const id = parseInt(bus.id, 10);
        const offset = bus.offset;
        let iterations = 0;
        while ((minTime + offset) % id !== 0) {
            minTime += product;
            iterations++;
        }
        product *= id;
    });
    return minTime;
};
exports.default = main;
