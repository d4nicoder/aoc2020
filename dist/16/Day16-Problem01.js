"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const readLines_1 = __importDefault(require("../readLines"));
const definitions = {};
let myTicket = [];
let nearbyTickets = [];
const evaluateNumber = (num) => {
    let valid = false;
    for (const definition in definitions) {
        if (!definitions.hasOwnProperty(definition)) {
            continue;
        }
        const intervals = definitions[definition];
        for (let i = 0; i < intervals.length; i++) {
            const [min, max] = intervals[i].split('-').map((n) => parseInt(n, 10));
            if (num >= min && num <= max) {
                return true;
            }
        }
    }
    return valid;
};
const main = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'));
    let stage = 0;
    lines.forEach((line) => {
        if (line === 'your ticket:') {
            stage = 1;
            return;
        }
        else if (line === 'nearby tickets:') {
            stage = 2;
            return;
        }
        if (stage === 0) {
            const definition = line.split(':');
            const intervals = definition[1].split(' or ');
            definitions[definition[0]] = intervals.map((interval) => interval.trim());
        }
        else if (stage === 1) {
            myTicket = line.split(',').map((item) => parseInt(item, 10));
        }
        else if (stage === 2) {
            nearbyTickets.push(line.split(',').map((item) => parseInt(item, 10)));
        }
    });
    const invalidNumbers = nearbyTickets.reduce((accum, ticket) => {
        for (let i = 0; i < ticket.length; i++) {
            if (!evaluateNumber(ticket[i])) {
                accum.push(ticket[i]);
            }
        }
        return accum;
    }, []);
    return invalidNumbers.reduce((accum, num) => {
        accum += num;
        return accum;
    }, 0);
};
exports.default = main;
