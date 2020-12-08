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
let lastLine: number = 0
const executionOrder: number[] = []
let finished: boolean = false
let programFinished: boolean = false

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

const runLine = (lineNumber: number): number => {
    if (!finished) {
        executionOrder.push(lineNumber)
    }
    const line = linesReaded.get(lineNumber)
    if (line) {
        if (line.executedTimes === 1) {
            return -1
        }
        line.executedTimes += 1
        linesReaded.set(lineNumber, line)

        switch (line.action) {
            case 'jmp':
                lastLine = lineNumber
                return runLine(lineNumber + line.value)
            case 'acc':
                accumulator += line.value
                lastLine = lineNumber
                return runLine(lineNumber + 1)
            case 'nop':
                lastLine = lineNumber
                return runLine(lineNumber + 1)
            default:
                return -1
        }
    } else {
        programFinished = true
        return 0
    }
}

const resetExecutions = () => {
    Array.from(linesReaded.keys()).forEach((num) => {
        const l = linesReaded.get(num)
        if (l) {
            l.executedTimes = 0
            linesReaded.set(num, l)
        }
    })
    accumulator = 0
}

const tryFix = (lineNumber: number): number => {
    const line = linesReaded.get(lineNumber)
    if (line) {
        if (line.action === 'jmp') {
            line.action = 'nop'
            linesReaded.set(lineNumber, line)
            resetExecutions()
            const ret = runLine(0)
            if (ret !== 0) {
                line.action = 'jmp'
                linesReaded.set(lineNumber, line)
                return -1
            }
        return 0
        } else if (line.action === 'nop' && line.value !== 0) {
            line.action = 'jmp'
            linesReaded.set(lineNumber, line)
            resetExecutions()
            const ret = runLine(0)
            if (ret !== 0) {
                line.action = 'nop'
                linesReaded.set(lineNumber, line)
                return -1
            }
        return 0
        }
    }
    return -1
}

const start = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))

    lines.forEach((line, index) => {
        parseLine(line, index)
    })

    runLine(0)

    finished = true

    while (!programFinished && executionOrder.length > 0) {
        const [ll] = executionOrder.splice(0, 1)
        if (tryFix(ll) === 0) {
            programFinished = true
        }
    }

    return accumulator
}

export default start
