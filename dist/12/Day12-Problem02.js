"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
let waypoint = {
    north: 1,
    south: 0,
    east: 10,
    west: 0
};
let movements = [];
let coordinates = {
    north: 0,
    south: 0,
    east: 0,
    west: 0
};
const faces = ['east', 'south', 'west', 'north'];
/**
 * Rotate x degrees the waypoint map
 * @param direction
 * @param degrees
 */
const rotate = (direction, degrees) => {
    /*
        We have to calculate the number of turns.
        For example R270 degrees equals to 3 turns, and L90
        equals to R270 and this to 3 turns
    */
    let turns = (degrees / 90) % 4;
    if (direction === 'L') {
        turns = 4 - turns;
    }
    if (turns === 0) {
        return;
    }
    const newWaypoint = {
        north: 0,
        south: 0,
        east: 0,
        west: 0
    };
    // For each waypoint coordinate get the new value based on the rotation
    for (const direction in newWaypoint) {
        const position = faces.indexOf(direction);
        const newPosition = (position + turns) % 4;
        const newDirection = faces[newPosition];
        newWaypoint[newDirection] = waypoint[direction];
    }
    waypoint = newWaypoint;
};
/**
 * Simplifies waypoints.
 * If we have 10 south and 3 north, it will be 7 south and 0 north
 * The same for east/west
 */
const sanitizeWaypoints = () => {
    if (waypoint.south > 0 && waypoint.north > 0) {
        if (waypoint.south > waypoint.north) {
            waypoint.south -= waypoint.north;
            waypoint.north = 0;
        }
        else if (waypoint.north > waypoint.south) {
            waypoint.north -= waypoint.south;
            waypoint.south = 0;
        }
    }
    if (waypoint.east > 0 && waypoint.west > 0) {
        if (waypoint.east > waypoint.west) {
            waypoint.east -= waypoint.west;
            waypoint.west = 0;
        }
        else if (waypoint.west > waypoint.east) {
            waypoint.west -= waypoint.east;
            waypoint.east = 0;
        }
    }
};
/**
 * Simplifies coordinates.
 * If we have 10 south and 3 north, it will be 7 south and 0 north
 * The same for east/west
 */
const sanitizeCoordinates = () => {
    if (coordinates.south > 0 && coordinates.north > 0) {
        if (coordinates.south > coordinates.north) {
            coordinates.south -= coordinates.north;
            coordinates.north = 0;
        }
        else if (coordinates.north > coordinates.south) {
            coordinates.north -= coordinates.south;
            coordinates.south = 0;
        }
    }
    if (coordinates.east > 0 && coordinates.west > 0) {
        if (coordinates.east > coordinates.west) {
            coordinates.east -= coordinates.west;
            coordinates.west = 0;
        }
        else if (coordinates.west > coordinates.east) {
            coordinates.west -= coordinates.east;
            coordinates.east = 0;
        }
    }
};
/**
 * Calculates position and waypoint after each instruction
 * @param movement
 */
const move = (movement) => {
    switch (movement.action) {
        case 'F':
            coordinates.north += movement.value * waypoint.north;
            coordinates.south += movement.value * waypoint.south;
            coordinates.east += movement.value * waypoint.east;
            coordinates.west += movement.value * waypoint.west;
            break;
        case 'E':
            waypoint.east += movement.value;
            break;
        case 'W':
            waypoint.west += movement.value;
            break;
        case 'S':
            waypoint.south += movement.value;
            break;
        case 'N':
            waypoint.north += movement.value;
            break;
        case 'L':
            rotate(movement.action, movement.value);
            break;
        case 'R':
            rotate(movement.action, movement.value);
            break;
    }
    sanitizeCoordinates();
    sanitizeWaypoints();
};
/**
 * Start point
 */
const main = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'));
    lines.forEach((line) => {
        const exp = /^([NSEWLRF])(\d+)$/;
        const match = line.match(exp);
        if (match) {
            const movement = {
                action: match[1],
                value: parseInt(match[2], 10)
            };
            movements.push(movement);
        }
    });
    for (let i = 0; i < movements.length; i++) {
        move(movements[i]);
    }
    return coordinates.east + coordinates.west + coordinates.south + coordinates.north;
};
exports.default = main;
