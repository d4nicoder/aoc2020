"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main = async () => {
    const real_input = '8,0,17,4,1,12';
    const input = real_input.split(',').map((num) => parseInt(num, 10));
    const registry = {};
    input.forEach((num, index) => {
        if (index < input.length - 1) {
            registry[num] = index;
        }
    });
    let lastSpoken = -1;
    for (let i = input.length; i < 2020; i++) {
        const last = input[i - 1];
        if (typeof registry[last] === 'number') {
            input.push((i - 1) - registry[last]);
        }
        else {
            input.push(0);
        }
        registry[last] = i - 1;
        lastSpoken = (i - 1) - registry[last];
    }
    return input[input.length - 1];
};
exports.default = main;
