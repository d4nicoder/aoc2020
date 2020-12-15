"use strict";
const main = async () => {
    const sample = '0,3,6';
    const sample2 = '1,3,2';
    const sample3 = '2,1,3';
    const sample4 = '1,2,3';
    const sample5 = '2,3,1';
    const sample6 = '3,2,1';
    const sample7 = '3,1,2';
    const real_input = '8,0,17,4,1,12';
    const input = real_input.split(',').map((num) => parseInt(num, 10));
    const registry = {};
    input.forEach((num, index) => {
        if (index < input.length - 1) {
            registry[num] = {
                index,
                repeats: 0
            };
        }
    });
    console.log(registry);
    let lastSpoken = -1;
    let lastReport = Date.now();
    for (let i = input.length; i < 30000000; i++) {
        if (Date.now() - lastReport >= 5000) {
            console.log(`Turn ${i}`);
            lastReport = Date.now();
        }
        const last = input[i - 1];
        if (typeof registry[last] !== 'undefined') {
            input.push((i - 1) - registry[last].index);
            registry[last].repeats++;
            registry[last].index = i - 1;
        }
        else {
            input.push(0);
            registry[last] = {
                index: i - 1,
                repeats: 0
            };
        }
        lastSpoken = (i - 1) - registry[last].index;
    }
    return input[input.length - 1];
};
main().then((result) => {
    console.log(`Result: ${result}`);
});
