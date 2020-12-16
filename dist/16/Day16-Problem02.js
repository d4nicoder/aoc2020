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
const positions = {};
/**
 * Evaluate if this number satisfies all constrains from definitions
 * @param num
 */
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
/**
 * Return an array with the posible fields for that number
 * @param num
 */
const getPossibleFields = (num) => {
    const fields = [];
    for (const definition in definitions) {
        if (!definitions.hasOwnProperty(definition)) {
            continue;
        }
        const intervals = definitions[definition];
        for (let i = 0; i < intervals.length; i++) {
            const [min, max] = intervals[i].split('-').map((n) => parseInt(n, 10));
            if (num >= min && num <= max) {
                fields.push(definition);
            }
        }
    }
    return fields;
};
/**
 * Register valid fields for that position and delete other fields stored in this position
 * @param position
 * @param fields
 */
const registerPosition = (position, fields) => {
    if (typeof positions[position] === 'undefined') {
        positions[position] = fields;
        return;
    }
    // strip positions fields that are not in the provided fields
    positions[position] = positions[position].filter((field) => fields.indexOf(field) >= 0);
};
/**
 * Delete one field from positions where there are more than one field
 * @param field
 */
const deleteField = (field) => {
    let deleted = false;
    for (const position in positions) {
        if (positions.hasOwnProperty(position)) {
            const k = positions[position].indexOf(field);
            if (k >= 0 && positions[position].length > 1) {
                positions[position].splice(k, 1);
                deleted = true;
            }
        }
    }
    return deleted;
};
/**
 * Search for positions with only one field, and delete this field from other positions
 */
const filter = () => {
    let repeat = false;
    for (const position in positions) {
        if (positions.hasOwnProperty(position)) {
            if (positions[position].length === 1) {
                // Delete this field from others
                if (deleteField(positions[position][0])) {
                    repeat = true;
                }
            }
        }
    }
    if (repeat) {
        filter();
    }
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
    const validTickets = nearbyTickets.filter((ticket) => {
        for (let i = 0; i < ticket.length; i++) {
            if (!evaluateNumber(ticket[i])) {
                return false;
            }
        }
        return true;
    });
    for (let i = 0; i < validTickets.length; i++) {
        validTickets[i].forEach((num, index) => {
            const fields = getPossibleFields(num);
            registerPosition(index, fields);
        });
    }
    // Les delete duplicated fields on positions with multiples fields
    filter();
    // Multiply values of fields starting with departure from my ticket and return this number
    return Array.from(Object.values(positions)).reduce((accum, field, index) => {
        if (/^departure/.test(field[0])) {
            accum *= myTicket[index];
        }
        return accum;
    }, 1);
};
exports.default = main;
