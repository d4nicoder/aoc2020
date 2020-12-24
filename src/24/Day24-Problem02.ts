import readLines from '../readLines'
import path from 'path'

type IDirection = {
    x: number;
    y: number;
    z: number;
}

const values: { [coord: string]: IDirection } = {
    e: {
        x: 0,
        y: 1,
        z: -1,
    },
    ne: {
        x: -1,
        y: 1,
        z: 0,
    },
    nw: {
        x: -1,
        y: 0,
        z: +1,
    },
    w: {
        x: 0,
        y: -1,
        z: 1,
    },
    sw: {
        x: 1,
        y: -1,
        z: 0,
    },
    se: {
        x: 1,
        y: 0,
        z: -1,
    },
}

let tiles: Map<string, number> = new Map()

const calculateInstructions = (instructions: string[]) => {
    //console.log(`\n******************************`)
    const destination = {
        x: 0,
        y: 0,
        z: 0,
    }
    for (let i = 0; i < instructions.length; i++) {
        //console.log(`Ins: ${instructions[i]}`)
        const direction = values[instructions[i]]
        destination.x += direction.x
        destination.y += direction.y
        destination.z += direction.z
        //console.log(`Direction: ${direction.x},${direction.y},${direction.z} => ${destination.x},${destination.y},${destination.z}`)
    }
    const id = `${ destination.x },${ destination.y },${ destination.z }`
    //console.log(`Destination: ${destination.x},${destination.y},${destination.z}`)

    const exists = tiles.get(id)
    if (!exists) {
        tiles.set(id, 1)
    } else {
        //console.log(`Exists`)
        tiles.set(id, exists + 1)
    }
}

const findNeighbors = (id: string): string[] => {
    const [x, y, z] = id.split(',').map((c) => parseInt(c, 10))

    const neighbors: string[] = []

    // To the east
    neighbors.push(`${ x },${ y + 1 },${ z - 1 }`)

    // To the SE
    neighbors.push(`${ x + 1 },${ y },${ z - 1 }`)

    // To the SW
    neighbors.push(`${ x + 1 },${ y - 1 },${ z }`)

    // To the W
    neighbors.push(`${ x },${ y - 1 },${ z + 1 }`)

    // To the NW
    neighbors.push(`${ x - 1 },${ y },${ z + 1 }`)

    // To the NE
    neighbors.push(`${ x - 1 },${ y + 1 },${ z }`)

    return neighbors
}

const fillNeighbors = () => {
    Array.from(tiles.entries()).forEach((tile) => {
        const neighbours = findNeighbors(tile[0])

        for (let i = 0; i < neighbours.length; i++) {
            const t = tiles.get(neighbours[i])
            if (!t) {
                tiles.set(neighbours[i], 2)
            }
        }
    })
}

const cleanNeighbours = () => {
    // Delete white
    Array.from(tiles.entries()).forEach((tile) => {
        if (tile[1] % 2 === 0) {
            tiles.delete(tile[0])
        }
    })
}

const newDay = () => {
    const toBlack: string[] = []
    const toWhite: string[] = []
    fillNeighbors()
    Array.from(tiles.entries()).forEach((tile) => {
        //console.log(`Analyzing tile: ${tile[0]}`)
        const neighbors = findNeighbors(tile[0])
        //console.log(neighbors)
        const color = tile[1] % 2 === 0 ? 'white' : 'black'
        const colorNeighbors = {
            white: 0,
            black: 0,
        }
        for (let i = 0; i < neighbors.length; i++) {
            const n = tiles.get(neighbors[i])
            if (typeof n === 'number') {
                //console.log(`Neighbour ${neighbors[i]} exists`)
                if (n % 2 === 1) {
                    colorNeighbors.black += 1
                } else {
                    colorNeighbors.white += 1
                }
            } else {
                // If not exists set default to white
                // console.log(`Neighbour ${neighbors[i]} not exists`)
                // toWhite.push(neighbors[i])
                colorNeighbors.white += 1
            }
        }
        // console.log(colorNeighbors)
        if (color === 'black') {
            if (colorNeighbors.black > 2 || colorNeighbors.black === 0) {
                // turn to white
                //console.log('Turn to white')
                toWhite.push(tile[0])
            }
        } else if (color === 'white') {
            if (colorNeighbors.black === 2) {
                // turn to black
                //console.log('Turn to black')
                toBlack.push(tile[0])
            }
        }
    })
    for (let i = 0; i < toWhite.length; i++) {
        tiles.set(toWhite[i], 2)
    }

    for (let i = 0; i < toBlack.length; i++) {
        tiles.set(toBlack[i], 1)
    }
    cleanNeighbours()
}

const getResult = (): number => {
    return Array.from(tiles.values()).reduce((accum: number, flips) => {
        if (flips % 2 !== 0) {
            accum += 1
        }
        return accum
    }, 0)
}

const main = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))
    lines.forEach((line) => {
        const arr = line.split('')
        const instructions: string[] = []
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 'e') {
                instructions.push('e')
            } else if (arr[i] === 'w') {
                instructions.push('w')
            } else if (arr[i] === 'n') {
                instructions.push(`${ arr[i] }${ arr[++i] }`)
            } else if (arr[i] === 's') {
                instructions.push(`${ arr[i] }${ arr[++i] }`)
            }
        }
        calculateInstructions(instructions)
    })

    for (let i = 0; i < 100; i++) {
        newDay()
        // console.log(`Day ${i + 1}: ${getResult()}`)
    }

    return getResult()
}

export default main
