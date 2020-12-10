import readLines from '../readLines'
import path from 'path'

type Diferences = {
    1: number;
    2: number;
    3: number;
}

let lastOrder: number[] = []
let finalVoltaje: number = 0

const diferences: Diferences = {
    1: 0,
    2: 0,
    3: 1
}

const processLine = (previous: number, line: number): number => {
    const diff = line - previous
    //console.log(`Processing ${line} - ${previous} = ${diff}`)
    if (diff > 3) {
        return -1
    }
    switch (diff) {
        case 1:
            diferences[1] += 1
            break
        case 2:
            diferences[2] += 1
            break
        case 3:
            diferences[3] += 1
            break
    }
    return line
}

// [1, 2, 3, 5, 6, 7, 9, 10]

const factorial = (num: number): number => {
    let total = 0
    for (let i = 1; i <= num; i++) {
        total = total + i
    }
    return total
}

const canDelete = (collection: number[], index: number, voltage: number): number => {
    console.log(`Can delete ${collection[index]} ?`)
    if (index >= collection.length - 1) {
        console.log(`    - Nope (end of array)`)
        return 0
    }

    let next = collection[index + 1]
    let previous = index === 0 ? 0 : collection[index - 1]

    let combinations = 0
    while (next - previous < 4) {
        console.log(`    - ${next} - ${previous} = ${next - previous} (deleting ${collection[index]}`)
        combinations++
        index++
        next = collection[index + 1]
    }
    console.log(`    ==================== ${combinations}`)
    return combinations
}

const canDeleteReverse = (collection: number[], index: number, voltage: number): number => {
    if (index >= collection.length - 1) {
        return 0
    }

    const next = collection[index + 1]
    let previous = index === 0 ? 0 : collection[index - 1]
    index --

    let combinations = 0
    while (index >= 0 && next - previous < 3) {
        console.log(`   - ${next} - ${previous} = ${next - previous}`)
        previous = collection[index - 1]
        combinations++
        index--
    }
    return combinations
}



const start = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'small_sample.txt'))

    const linesNumber = lines.map((line) => parseInt(line, 10))
    linesNumber.sort((a, b) => {
        if (a > b) {
            return 1
        } else if (a < b) {
            return -1
        }
        return 0
    })

    let result: number = -1
    let previous: number = 0
    for (let i = 0; i < linesNumber.length; i++) {
        const line = linesNumber[i]
        //console.log(`${line} ${typeof line}`)
        if (processLine(previous, line) < 0) {
            result = diferences[1] * diferences[3]
            finalVoltaje = linesNumber[i - 1] + 3
            return result
        }
        lastOrder.push(line)
        previous = line
    }
    console.log(diferences)
    finalVoltaje = linesNumber[linesNumber.length - 1] + 3
    console.log(`Final voltage: ${finalVoltaje}`)
    console.log(lastOrder.join(','))

    let combinations = 1
    for (let i = 0; i <= lastOrder.length; i++) {
        const comb = canDelete(lastOrder, i, finalVoltaje)
        if (comb) {
            combinations += comb**2
        }
    }
    return combinations
}

start().then((result) => {
    console.log(`Result: ${result} (${factorial(result)})`)
}).catch(console.error)
