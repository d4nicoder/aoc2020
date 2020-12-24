import readLines from '../readLines'
import path from 'path'

type IDirection = {
    y: number;
    x: number;
}

const values: { [coord: string]: IDirection } = {
    e: {
        x: 0,
        y: 1,
    },
    ne: {
        x: 0.5,
        y: 0.5,
    },
    nw: {
        x: 0.5,
        y: -0.5,
    },
    w: {
        x: 0,
        y: -1,
    },
    sw: {
        x: -0.5,
        y: -0.5,
    },
    se: {
        x: -0.5,
        y: 0.5,
    },
}

const tiles: Map<string, number> = new Map()

const calculateInstructions = (instructions: string[]) => {
    const destination = {
        x: 0,
        y: 0,
    }
    for (let i = 0; i < instructions.length; i++) {
        const direction = values[instructions[i]]
        destination.x += direction.x
        destination.y += direction.y
    }
    const id = `${ destination.x },${ destination.y }`

    const exists = tiles.get(id)
    if (!exists) {
        tiles.set(id, 1)
    } else {
        tiles.set(id, exists + 1)
    }
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
    return getResult()
}

export default main
