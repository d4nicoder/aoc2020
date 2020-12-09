import readLines from '../readLines'
import path from 'path'

const findSum = (collection: number[], position: number, preamble: number): boolean => {
    const targetNumber = collection[position]
    const validCollection = collection.slice(position - preamble, position)
    for (let i = 0; i < validCollection.length; i++) {
        const first = validCollection[i]
        for (let j = i+1; j < validCollection.length; j++) {
            const second = validCollection[j]
            if (first + second === targetNumber) {
                return true
            }
        }
    }
    return false
}

const start = async (): Promise<number> => {
    const file = 'input.txt'
    const preamble = 25
    const lines = await readLines(path.join(__dirname, file))
    const numbers: number[] = lines.map((line) => parseInt(line, 10))

    for (let i = preamble; i < numbers.length; i++) {
        if (!findSum(numbers, i, preamble)) {
            return numbers[i]
        }
    }
    return -1
}

export default start
