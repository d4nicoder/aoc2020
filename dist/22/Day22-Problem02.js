"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
const Player1 = [];
const Player2 = [];
// NEW METHOD
let Game = 0;
let Round = 0;
let SubRounds = {};
const INPUT = 'input.txt';
const log = (content) => {
    if (INPUT === 'input.txt') {
        return;
    }
    console.log(content);
};
const playRound = (player1, player2, gameMaze) => {
    log(`\n-- Game ${Game} (Round ${++SubRounds[Game]}) --`);
    log(`Player 1: ${player1.join(',')}`);
    log(`Player 2: ${player2.join(',')}`);
    log(`Player 1 plays: ${player1[0]}`);
    log(`Player 2 plays: ${player2[0]}`);
    // copy decks
    const deck1 = [...player1];
    const deck2 = [...player2];
    const maze = `1${deck1.join(',')}-2${deck2.join(',')}`;
    if (gameMaze.has(maze)) {
        // Player 1 wins
        log(`Repeated maze, player one wins Game ${Game}`);
        // winDeck = deck1
        // const res = result([deck1, []])
        // console.log(res)
        // process.exit(0)
        return 3;
    }
    gameMaze.set(maze, null);
    // log(`\***** Maze of game ${Game} *****`)
    // log(gameMaze)
    const [card1] = deck1.splice(0, 1);
    const [card2] = deck2.splice(0, 1);
    if (card1 <= deck1.length && card2 <= deck2.length) {
        // subgame
        const cd1 = [...deck1].splice(0, card1);
        const cd2 = [...deck2].splice(0, card2);
        const winner = playGame(cd1, cd2);
        log(`Player ${winner} wins round ${SubRounds[Game]} of game ${Game}!`);
        return winner;
    }
    else {
        if (card1 > card2) {
            log(`Player 1 wins round ${SubRounds[Game]} of game ${Game}!`);
            return 1;
        }
        else {
            log(`Player 2 wins round ${SubRounds[Game]} of game ${Game}!`);
            return 2;
        }
    }
};
let winDeck = [];
const playGame = (player1, player2) => {
    Game++;
    log(`\n====== GAME ${Game} ======\n`);
    if (typeof SubRounds[Game] === 'undefined') {
        SubRounds[Game] = 0;
    }
    Round++;
    let p1 = [...player1];
    let p2 = [...player2];
    const gameMaze = new Map();
    while (p1.length > 0 && p2.length > 0) {
        const win = playRound(p1, p2, gameMaze);
        const [c1] = p1.splice(0, 1);
        const [c2] = p2.splice(0, 1);
        if (win === 1) {
            p1.push(c1, c2);
        }
        else if (win === 3) {
            p1.push(c1, c2);
            winDeck = p1;
            return 1;
        }
        else {
            p2.push(c2, c1);
        }
    }
    if (p1.length === 0) {
        winDeck = p2;
        log(`The winner of game ${Game} is player 2!`);
        Game--;
        return 2;
    }
    else {
        winDeck = p1;
        log(`The winner of game ${Game} is player 1!`);
        Game--;
        return 1;
    }
};
const result = (res) => {
    const arr = res.reverse();
    return arr.reduce((accum, item, index) => {
        accum += item * (index + 1);
        return accum;
    }, 0);
};
const main = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, INPUT));
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
                Player1.push(parseInt(line, 10));
            }
            else if (player === 2) {
                Player2.push(parseInt(line, 10));
            }
        }
    });
    const win = playGame(Player1, Player2);
    // console.log(`Win player ${win} with deck ${winDeck.join(',')}`)
    return result(winDeck);
};
exports.default = main;
