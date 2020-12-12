import readLines from '../readLines'
import path from 'path'

type IMovement = {
    action: string;
    value: number;
}

let movements: IMovement[] = []

const coordinates: any = {
    north: 0,
    south: 0,
    east: 0,
    west: 0
}

let shipFace = 'east'

let faces: string[] = ['east', 'south', 'west', 'north']

/**
 * Rotate x degrees the direction of the ship
 * @param direction
 * @param degrees
 */
const rotate = (direction: string, degrees: number): void => {
    /*
        We have to calculate the number of turns.
        For example R270 degrees equals to 3 turns, and L90
        equals to R270 and this to 3 turns
    */
    let spins = (degrees  / 90) % 4

    if (direction === 'L') {
        spins = 4 - spins
    }

    const position = faces.indexOf(shipFace)
    const newPosition = (position + spins) % 4
    shipFace = faces[newPosition]
}

/**
 * Calculates the new coordinates and face direction after each movement
 * @param movement
 */
const move = (movement: IMovement): void => {
    switch (movement.action) {
        case 'F':
            coordinates[shipFace] += movement.value
            break
        case 'E':
            coordinates.east += movement.value
            break
        case 'W':
            coordinates.west += movement.value
            break
        case 'S':
            coordinates.south += movement.value
            break
        case 'N':
            coordinates.north += movement.value
            break
        case 'L':
            rotate(movement.action, movement.value)
            break
        case 'R':
            rotate(movement.action, movement.value)
            break
    }
}

/**
 * Start point
 */
const main = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))
    lines.forEach((line) => {
        const exp = /^([NSEWLRF])(\d+)$/
        const match = line.match(exp)
        if (match) {
            const movement: IMovement = {
                action: match[1],
                value: parseInt(match[2], 10)
            }
            movements.push(movement)
        }
    })

    for (let i = 0; i < movements.length; i++) {
        move(movements[i])
    }

    return Math.abs(coordinates.east - coordinates.west) + Math.abs(coordinates.south - coordinates.north)
}

export default main
