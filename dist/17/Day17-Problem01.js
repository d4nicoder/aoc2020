"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
let pocket = new Map();
const getFlatCoord = (coords) => {
    return `${coords.x}x${coords.y}x${coords.z}`;
};
const setCube = (coord, state) => {
    const flatCoord = getFlatCoord(coord);
    pocket.set(flatCoord, {
        coords: coord,
        state,
    });
};
const getState = (coords) => {
    const flatCoord = getFlatCoord(coords);
    if (pocket.has(flatCoord)) {
        const data = pocket.get(flatCoord);
        if (data) {
            return data.state;
        }
        return '.';
    }
    else {
        // Create it
        pocket.set(flatCoord, {
            coords,
            state: '.',
        });
    }
    return '.';
};
const cleanMap = () => {
    // Get min and max value of every axis with an active box
    let minX = 0;
    let minY = 0;
    let minZ = 0;
    let maxX = 0;
    let maxY = 0;
    let maxZ = 0;
    Array.from(pocket.entries()).forEach((data) => {
        if (data[1].state === '#') {
            minX = minX > data[1].coords.x ? data[1].coords.x : minX;
            minY = minY > data[1].coords.y ? data[1].coords.y : minY;
            minZ = minZ > data[1].coords.z ? data[1].coords.z : minZ;
            maxX = maxX < data[1].coords.x ? data[1].coords.x : maxX;
            maxY = maxY < data[1].coords.y ? data[1].coords.y : maxY;
            maxZ = maxZ < data[1].coords.z ? data[1].coords.z : maxZ;
        }
    });
    // Delete all out of bounds
    let newMap = new Map();
    Array.from(pocket.entries()).forEach((data) => {
        if (data[1].coords.x < minX || data[1].coords.x > maxX
            || data[1].coords.y < minY || data[1].coords.y > maxY
            || data[1].coords.z < minZ || data[1].coords.z > maxZ) {
            return;
        }
        newMap.set(data[0], data[1]);
    });
    pocket = newMap;
};
const growMap = () => {
    const newMap = new Map();
    Array.from(pocket.entries()).forEach((cube) => {
        const neighbors = getNeighbors(cube[1].coords);
        for (let i = 0; i < neighbors.length; i++) {
            const flatNeighbor = getFlatCoord(neighbors[i]);
            if (pocket.has(flatNeighbor)) {
                const neighbor = pocket.get(flatNeighbor);
                if (neighbor) {
                    newMap.set(flatNeighbor, neighbor);
                }
                else {
                    newMap.set(flatNeighbor, {
                        coords: neighbors[i],
                        state: '.',
                    });
                }
            }
            else {
                newMap.set(flatNeighbor, {
                    coords: neighbors[i],
                    state: '.',
                });
            }
        }
    });
    pocket = newMap;
};
const nextCicle = () => {
    // Grow
    growMap();
    const newMap = new Map();
    Array.from(pocket.entries()).forEach((data) => {
        const neighbors = getNeighbors(data[1].coords);
        let actives = 0;
        for (let i = 0; i < neighbors.length; i++) {
            const state = getState(neighbors[i]);
            if (state === '#') {
                actives += 1;
            }
        }
        let newState = data[1].state;
        if (data[1].state === '.') {
            if (actives === 3) {
                newState = '#';
            }
            else {
                newState = '.';
            }
        }
        else {
            if (actives >= 2 && actives <= 3) {
                newState = '#';
            }
            else {
                newState = '.';
            }
        }
        newMap.set(data[0], {
            coords: data[1].coords,
            state: newState,
        });
    });
    // Update pocket
    pocket = newMap;
    cleanMap();
};
const getNeighbors = (coords) => {
    const neighbors = [];
    for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
            for (let z = -1; z < 2; z++) {
                const coord = {
                    x: coords.x + x,
                    y: coords.y + y,
                    z: coords.z + z,
                };
                if (coords.x !== coord.x || coords.y !== coord.y || coords.z !== coord.z) {
                    neighbors.push(coord);
                }
            }
        }
    }
    return neighbors;
};
const main = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'));
    lines.forEach((line, y) => {
        const z = 0;
        const cubes = line.split('');
        for (let x = 0; x < cubes.length; x++) {
            setCube({ x, y, z }, cubes[x]);
        }
    });
    for (let i = 0; i < 6; i++) {
        nextCicle();
    }
    return Array.from(pocket.values()).reduce((accum, cube) => {
        if (cube.state === '#') {
            accum += 1;
        }
        return accum;
    }, 0);
};
exports.default = main;
