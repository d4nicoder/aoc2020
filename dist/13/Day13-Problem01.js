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
    const estimatedArrival = parseInt(lines[0], 10);
    let betterProximity = -1;
    const busId = lines[1].split(',').reduce((accum, bus) => {
        if (bus === 'x') {
            return accum;
        }
        const timestamp = parseInt(bus, 10);
        const departureTime = (Math.floor(estimatedArrival / timestamp) * timestamp) + timestamp;
        if (betterProximity > departureTime || accum < 0) {
            accum = timestamp;
            betterProximity = departureTime;
        }
        return accum;
    }, betterProximity);
    return busId * (betterProximity - estimatedArrival);
};
exports.default = main;
