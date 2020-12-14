import readLines from '../readLines'
import path from 'path'

const applyMask = (num: number, mask: string): number => {
    let numBitsReverse = num.toString(2).split('').reverse()
    const maskReverse = mask.split('').reverse()

    const result = maskReverse.map((num, index) => {
        if (num !== 'X') {
            return num
        }
        if (numBitsReverse[index]) {
            return numBitsReverse[index]
        }
        return '0'
    })
    return parseInt(result.reverse().join(''), 2)
}

const main = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))
    let memory: number[] = []
    let maskPattern = ''
    lines.forEach((line) => {
        const isMask = line.match(/^mask = ([X10]{36})/)
        if (isMask) {
            maskPattern = isMask[1]
        }

        const isInstruction = line.match(/^mem\[(\d+)] = (\d+)/)
        if (isInstruction) {
            const result = applyMask(parseInt(isInstruction[2], 10), maskPattern)
            const memoryAddress = parseInt(isInstruction[1], 10)
            memory[memoryAddress] = result
        }
    })
    memory = memory.filter((value) => typeof value === 'number')
    const result = memory.reduce((accum, value) => {
        if (value) {
            accum += value
        }
        return accum
    }, 0)
    return result
}

export default main
