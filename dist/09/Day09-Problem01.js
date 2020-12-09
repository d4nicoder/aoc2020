"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
const findSum = (collection, position, preamble) => {
    const targetNumber = collection[position];
    const validCollection = collection.slice(position - preamble, position);
    // console.log(validCollection)
    // console.log(`Looking for number ${collection[position]}`)
    for (let i = 0; i < validCollection.length; i++) {
        const first = validCollection[i];
        for (let j = i + 1; j < validCollection.length; j++) {
            const second = validCollection[j];
            //console.log(`   - Checking ${first} + ${second} = ${first + second}`)
            if (first + second === targetNumber) {
                return true;
            }
            //console.log(`       * Not valid`)
        }
    }
    return false;
};
const start = async (file, preamble) => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, file));
    const numbers = lines.map((line) => parseInt(line, 10));
    for (let i = preamble; i < numbers.length; i++) {
        if (!findSum(numbers, i, preamble)) {
            return numbers[i];
        }
    }
    return -1;
};
start('sample.txt', 5).then((result) => {
    console.log(`Result for sample input: ${result}`);
}).catch(console.error);
start('input.txt', 25).then((result) => {
    console.log(`Result for problem input: ${result}`);
}).catch(console.error);
