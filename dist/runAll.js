"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Day01_Problem01_1 = __importDefault(require("./01/Day01-Problem01"));
const Day01_Problem02_1 = __importDefault(require("./01/Day01-Problem02"));
const Day02_Problem01_1 = __importDefault(require("./02/Day02-Problem01"));
const Day02_Problem02_1 = __importDefault(require("./02/Day02-Problem02"));
const runAll = async () => {
    try {
        await Day01_Problem01_1.default();
    }
    catch (e) {
        console.error(e);
    }
    console.log('\n\n');
    try {
        await Day01_Problem02_1.default();
    }
    catch (e) {
        console.error(e);
    }
    console.log('\n\n');
    try {
        await Day02_Problem01_1.default();
    }
    catch (e) {
        console.error(e);
    }
    console.log('\n\n');
    try {
        await Day02_Problem02_1.default();
    }
    catch (e) {
        console.error(e);
    }
};
runAll().catch(console.error);
