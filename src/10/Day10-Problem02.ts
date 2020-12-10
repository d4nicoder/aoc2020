import readLines from '../readLines'
import path from 'path'

let lastOrder: number[] = []
let finalVoltaje: number = 0

const processLine = (previous: number, line: number): number => {
    const diff = line - previous
    if (diff > 3) {
        return -1
    }
    return line
}
let checked: Map<number, number> = new Map()
const getCombinations = (collection: number[], position: number): number => {
    let value: number = 0
    if (position === collection.length - 1) {
        return 1
    }

    if (checked.has(position)) {
        const stored = checked.get(position)
        if (stored) {
            return stored
        }
    }
    for (let i = position + 1; i < collection.length; i++) {
        if (collection[i] - collection[position] <= 3) {
            value += getCombinations(collection, i)
        }
    }
    checked.set(position, value)
    return value
}

const start = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))

    const linesNumber = lines.map((line) => parseInt(line, 10))
    linesNumber.sort((a, b) => {
        if (a > b) {
            return 1
        } else if (a < b) {
            return -1
        }
        return 0
    })

    let previous: number = 0
    let ended: boolean = false
    for (let i = 0; i < linesNumber.length; i++) {
        const line = linesNumber[i]
        if (processLine(previous, line) < 0) {
            finalVoltaje = linesNumber[i - 1] + 3
            ended = true
        }
        if (!ended) {
            lastOrder.push(line)
            previous = line
        }
    }
    finalVoltaje = linesNumber[linesNumber.length - 1] + 3

    const completeArray = Array(1).fill(0).concat(lastOrder).concat([finalVoltaje])
    return getCombinations(completeArray, 0)
}

export default start
