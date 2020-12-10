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

let calls = 0
let permutaciones: number = 0
let lastReport = new Date().getTime()
const findCombination = (collection: number[], index: number, voltage: number): number => {
    permutaciones += 1
    if (Date.now() - lastReport > 5000) {
        console.log(`Permutaciones: ${permutaciones}`)
        lastReport = Date.now()
    }
    calls += 1
    let previous = index === 0 ? 0 : collection[index - 1]

    //console.log(`${calls}: length: ${collection.length}, index: ${index}, previous: ${previous}, actual ${collection[index]}`)
    if (voltage - collection[index] <= 3) {
        //console.log(`${voltage} - ${collection[index]} <= 3. exit(0)`)
        return 0
    }
    if (voltage - collection[index] === 3) {
        //console.log(collection)
        return 0
    }

    const newCollection: number[] = Array().concat(collection)
    newCollection.splice(index, 1)
    let variants: number = 1

    if (newCollection[index] - previous > 3) {
        return findCombination(collection, index + 1, voltage)
    }
    // console.log(newCollection.join(','))
    if (newCollection.length <= index) {
        //console.log('New collection small than index. Exit(0)')
        return 0
    }
    if (newCollection[index + 1] - newCollection[index] > 3) {
        //console.log(`${newCollection[index + 1]} - ${newCollection[index]} > 3. Next item`)
        variants += findCombination(collection, index + 1, voltage)
        return variants
    } else {
        //console.log('Same index, new collection')
        variants += findCombination(newCollection, index, voltage)
        variants += findCombination(collection, index + 1, voltage)
        return variants
    }
    return variants
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
    //return diferences[1] * diferences[3]
    return findCombination(lastOrder, 0, finalVoltaje) + 1
}

start().then((result) => {
    console.log(`Result: ${result}`)
}).catch(console.error)
