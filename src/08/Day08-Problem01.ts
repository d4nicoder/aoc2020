import readLines from '../readLines'
import path from 'path'

type IInstruction = {
    lineNumber: number;
    action: string;
    value: number;
    accumulator: number;
    executedTimes: number;
}

const linesReaded: Map<number, IInstruction> = new Map()
let accumulator: number = 0

const parseLine = (line: string, lineNumber: number): any => {
    const regexp = /^([a-z]{3}) ([+\-\d]+)$/
    const matched = line.match(regexp)
    if (matched) {
        const details: IInstruction = {
            lineNumber,
            action: matched[1],
            value: parseInt(matched[2], 10),
            accumulator: 0,
            executedTimes: 0
        }
        linesReaded.set(lineNumber, details)
        return details
    }
}

const runLine = (lineNumber: number): void => {
    const line = linesReaded.get(lineNumber)
    if (line) {
        if (line.executedTimes === 1) {
            return
        }
        line.executedTimes += 1
        linesReaded.set(lineNumber, line)

        switch (line.action) {
            case 'jmp':
                runLine(lineNumber + line.value)
                break
            case 'acc':
                accumulator += line.value
                runLine(lineNumber + 1)
                break
            case 'nop':
                runLine(lineNumber + 1)
        }
    }
}

const start = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))

    lines.forEach((line, index) => {
        parseLine(line, index)
    })

    runLine(0)

    return accumulator
}

export default start
