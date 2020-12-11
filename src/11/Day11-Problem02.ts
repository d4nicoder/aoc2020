import readLines from '../readLines'
import path from 'path'
import crypto from 'crypto'

let seats: string[][] = []
let rounds: number = 0
let lastHash: string = ''

const findDirection = (collection: string[][], row: number, rowDirection: number, col: number, colDirection: number): number => {
    let found = 0
    if (row < 0) {
        return found
    }
    if (col < 0) {
        return found
    }
    if (row >= collection.length) {
        return found
    }
    if (col >= collection[0].length) {
        return found
    }
    if (collection[row][col] === '.') {
        return findDirection(collection, row + rowDirection, rowDirection, col + colDirection, colDirection)
    }
    return collection[row][col] === '#' ? 1 : 0
}

const getAdyacentNum = (row: number, col: number): number => {
    let num: number = 0

    num += findDirection(seats, row - 1, -1, col-1, -1)
    // up
    num += findDirection(seats, row - 1, -1, col, 0)
    // up right
    num += findDirection(seats, row - 1, -1, col+1, 1)
    // left
    num += findDirection(seats, row, 0, col-1, -1)
    // right
    num += findDirection(seats, row, 0, col+1, 1)
    // down left
    num += findDirection(seats, row + 1, 1, col-1, -1)
    // down
    num += findDirection(seats, row + 1, 1, col, 0)
    // down right
    num += findDirection(seats, row + 1, 1, col+1, 1)

    return num
}

const nextRound = (): boolean => {
    let matrix: string = ''
    for (let r = 0; r < seats.length; r++) {
        for (let c = 0; c < seats[r].length; c++) {
            const itemType = seats[r][c]
            const adjacent = getAdyacentNum(r, c)
            if (itemType === 'L') {
                if (adjacent === 0) {
                    // Becomes occupied
                    matrix += '#'
                } else {
                    // Becomes free
                    matrix += 'L'
                }
            } else if (itemType === '#') {
                if (adjacent >= 5) {
                    matrix += 'L'
                } else {
                    matrix += '#'
                }
            } else {
                matrix += '.'
            }
        }
        matrix += '\n'
    }
    const tempSeats = convertMatrix(matrix)
    const hash = getHash(tempSeats)
    if (lastHash !== hash) {
        lastHash = hash
        rounds++
        seats = tempSeats
        return true
    }
    return false
}

const countOccupied = (matrix: string[][]): number => {
    const occupied = matrix.reduce((accum, item) => {
        const m = item.join(',').match(/#/gm)
        if (m) {
            accum += m.length
        }
        return accum
    }, 0)
    return occupied
}

const getHash = (matrix: string[][]): string => {
    const str = matrix.reduce((accum, row) => {
        accum += row.join(',') + ','
        return accum
    }, '')
    return crypto.createHash('md5').update(str).digest('hex');
}

const convertMatrix = (matrix: string): string[][] => {
    const mat: string[][] = []
    matrix.split('\n').forEach((line) => {
        if (line.trim() !== '') {
            const row = line.trim().split('')
            mat.push(row)
        }
    })
    return mat
}

const start = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))
    lines.forEach((line) => {
        // console.log(line)
        const row = line.trim().split('')
        seats.push(row)
    })

    let working: boolean = true
    while (working) {
        working = nextRound()
    }

    return countOccupied(seats)
}


export default start
