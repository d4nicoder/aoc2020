import readLines from '../readLines'
import path from 'path'

const MAX_LEVEL_LOG = 0

const initialCups: number[] = []

const log = (message: any, level?: number) => {
    level = typeof level !== 'number' ? 100 : level

    if (level <= MAX_LEVEL_LOG) {
        console.log(message)
    }
}
let moves = 0

const rotate = (arr: number[], times: number): number[] => {
    for (let i = 0; i < times; i++) {
        arr.unshift(<number>arr.pop())
    }
    return arr
}

const move = (cups: number[]): number[] => {
    log(`=== MOVE ${ moves++ + 1 } ===`)
    log(`cups: ${ cups.join(',') }`)

    const currentCup = (moves - 1) % cups.length

    // Rotate (currentCup) times anti clockwise
    const firstRotate = cups.length - currentCup
    log(`First rotate -${cups.length - firstRotate}`)
    cups = rotate(cups, firstRotate)

    log(`Current cup pos: 0 (${ cups[0] })`)
    const label = cups[0]
    const startPick = 1
    let picked: number[] = cups.splice(1, 3)


    log(`Cups after pick: ${ cups.join(',') }`)

    const lessValue = [...cups].sort()[0]
    const highValue = [...cups].sort()[cups.length - 1]

    log(`Less value: ${ lessValue }`)
    log(`High value: ${ highValue }`)

    let destination = label - 1
    while (cups.indexOf(destination) < 0) {
        destination--
        if (destination < lessValue) {
            destination = highValue
        }
    }
    let destinationIndex = cups.indexOf(destination)
    log(`pick up: ${ picked.join(',') }`)
    log(`Destination: ${ destination } (${ destinationIndex })`)

    picked.forEach((num, index) => {
        cups.splice(1 + destinationIndex + index, 0, num)
    })

    // Lets rotate
    const secondRotate = cups.length - firstRotate
    log(`Second rotate ${secondRotate}`)
    return rotate(cups, secondRotate)
}

const getResult = (cups: number[]): string => {
    const idx = cups.indexOf(1)
    const k = cups.length - idx
    cups = rotate(cups, k)
    return cups.reduce((accum: string, num) => {
        if (num !== 1) {
            accum += num.toString()
        }
        return accum
    }, '')
}

const main = async (): Promise<string> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))
    lines[0].split('').forEach((digit) => {
        initialCups.push(parseInt(digit, 10))
    })
    log(initialCups.join(','))
    let cups = [...initialCups]
    for (let i = 0; i < 100; i++) {
        cups = move([...cups])
        log(cups.join(','))
    }

    return getResult(cups)
}

export default main
