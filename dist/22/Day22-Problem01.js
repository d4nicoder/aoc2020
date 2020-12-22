"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
const player1 = [];
const player2 = [];
const play = () => {
    if (player1.length === 0 || player2.length === 0) {
        return;
    }
    const card1 = player1.splice(0, 1)[0];
    const card2 = player2.splice(0, 1)[0];
    if (card1 > card2) {
        player1.push(card1);
        player1.push(card2);
    }
    else {
        player2.push(card2);
        player2.push(card1);
    }
    play();
};
const result = () => {
    if (player1.length > 0) {
        const arr = player1.reverse();
        return arr.reduce((accum, item, index) => {
            accum += item * (index + 1);
            return accum;
        }, 0);
    }
    else {
        const arr = player2.reverse();
        return arr.reduce((accum, item, index) => {
            accum += item * (index + 1);
            return accum;
        }, 0);
    }
};
const main = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'));
    let player = 0;
    lines.forEach((line) => {
        if (line === 'Player 1:') {
            player = 1;
        }
        else if (line === 'Player 2:') {
            player = 2;
        }
        else if (/^\d+$/.test(line)) {
            if (player === 1) {
                player1.push(parseInt(line, 10));
            }
            else if (player === 2) {
                player2.push(parseInt(line, 10));
            }
        }
    });
    play();
    return result();
};
exports.default = main;
