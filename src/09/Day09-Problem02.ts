import readLines from '../readLines'
import path from 'path'

const findSum = (collection: number[], position: number, preamble: number): boolean => {
    const targetNumber = collection[position]
    const validCollection = collection.slice(position - preamble, position)
    // console.log(validCollection)
    // console.log(`Looking for number ${collection[position]}`)
    for (let i = 0; i < validCollection.length; i++) {
        const first = validCollection[i]
        for (let j = i+1; j < validCollection.length; j++) {
            const second = validCollection[j]
            //console.log(`   - Checking ${first} + ${second} = ${first + second}`)
            if (first + second === targetNumber) {
                return true
            }
        //console.log(`       * Not valid`)
        }
    }
    return false
}

const findContiguous = (collection: number[], start: number, targetNumber: number): number => {
    let sum: number[] = []
    for (let i = start; i < collection.length; i++) {
        const num = collection[i]
        sum.push(num)
        const result = sum.reduce((accum: number, n: number) => {
            accum += n
            return accum
        }, 0)
        if (result === targetNumber) {
            sum.sort()
            return sum[0] + sum[sum.length - 1]
        } else if (result > targetNumber) {
            return findContiguous(collection, start + 1, targetNumber)
        }
    }

    return -1
}

const start = async (): Promise<number> => {
    const file = 'input.txt'
    const preamble = 25
    const lines = await readLines(path.join(__dirname, file))
    const numbers: number[] = lines.map((line) => parseInt(line, 10))

    let target: number = 0
    for (let i = preamble; i < numbers.length; i++) {
        if (!findSum(numbers, i, preamble)) {
            target = numbers[i]
        }
    }

    const hack = findContiguous(numbers, 0, target)
    return hack
}

export default start
