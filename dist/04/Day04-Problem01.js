"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getLineFields = (line) => {
    const fields = line.split(' ');
    const passport = {};
    for (let i = 0; i < fields.length; i++) {
        const [key, value] = fields[i].split(':');
        switch (key) {
            case 'byr':
                passport.byr = value;
                break;
            case 'iyr':
                passport.iyr = value;
                break;
            case 'eyr':
                passport.eyr = value;
                break;
            case 'hgt':
                passport.hgt = value;
                break;
            case 'hcl':
                passport.hcl = value;
                break;
            case 'ecl':
                passport.ecl = value;
                break;
            case 'pid':
                passport.pid = value;
                break;
            case 'cid':
                passport.cid = value;
                break;
        }
    }
    return passport;
};
const getPassports = (rawData) => {
    const lines = rawData.split('\n');
    const passports = [];
    let actualPassport = {};
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === '') {
            // new passport
            passports.push(actualPassport);
            actualPassport = {};
        }
        actualPassport = { ...actualPassport, ...getLineFields(line) };
    }
    return passports;
};
const getValidPassports = (passports) => {
    return passports.reduce((accum, passport) => {
        if (passport.byr && passport.iyr && passport.eyr && passport.hgt && passport.hcl && passport.ecl && passport.pid) {
            accum += 1;
        }
        return accum;
    }, 0);
};
const start = async () => {
    const data = await fs_1.default.promises.readFile(path_1.default.join(__dirname, 'input.txt'));
    const passports = getPassports(data.toString());
    const validPassports = getValidPassports(passports);
    return validPassports;
};
exports.default = start;
