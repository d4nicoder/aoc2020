import fs from 'fs'
import path from 'path'

type ISumNumbers = [
    number,
    number
]

const findSumNumbers = (inputNumbers: number[]): ISumNumbers => {
    for (let i = 0; i < inputNumbers.length; i++) {
        const firstSum = parseInt(inputNumbers[i].toString(), 10)
        for (let j = i; j < inputNumbers.length; j++) {
            const secondSum = parseInt(inputNumbers[j].toString(), 10)

            if (firstSum + secondSum === 2020) {
                return [firstSum, secondSum]
            }
        }
    }
    throw new Error('Sum not found')
}

const start = async (): Promise<number> => {
    const inputData = await fs.promises.readFile(path.join(__dirname, 'input.txt'))
    const numbers = inputData.toString().split('\n').map((line: string) => {
        return parseInt(line.trim(), 10)
    })
    const sumNumbers = findSumNumbers(numbers)
    const result = sumNumbers[0] * sumNumbers[1]
    return result
}

export default start
