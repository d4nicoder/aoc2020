import fs from 'fs'
import path from 'path'

type ISumNumbers = [
    number,
    number
]

const findSumNumbers = (inputNumbers: number[]): ISumNumbers => {
    const result: ISumNumbers = [-1, -1]
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

const start = async (): Promise<void> => {
    console.log(`Advent Of Code 2020.`)
    console.log(`Day 01 problem nº 1`)
    console.log(`=================================`)
    const inputData = await fs.promises.readFile(path.join(__dirname, 'input.txt'))
    const numbers = inputData.toString().split('\n').map((line: string) => {
        return parseInt(line.trim(), 10)
    })
    const sumNumbers = findSumNumbers(numbers)
    console.log(`    - Found numbers [${sumNumbers.join(', ')}]`)
    const result = sumNumbers[0] * sumNumbers[1]
    console.log(`    - Final result: ${result}`)
}

export default start
