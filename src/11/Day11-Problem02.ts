import readLines from '../readLines'
import path from 'path'

let seats: string[][] = []
let rounds: number = 0
let lastHash: string = ''

const size = {
    rows: 0,
    cols: 0
}

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

const getAdjacentNum = (row: number, col: number): number => {
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
    let matrix: string[][] = []
    for (let r = 0; r < size.rows; r++) {
        const row: string[] = []
        for (let c = 0; c < size.cols; c++) {
            const itemType = seats[r][c]
            const adjacent = getAdjacentNum(r, c)
            if (itemType === 'L') {
                if (adjacent === 0) {
                    // Becomes occupied
                    row.push('#')
                } else {
                    row.push('L')
                }
            } else if (itemType === '#') {
                if (adjacent >= 5) {
                    row.push('L')
                } else {
                    row.push('#')
                }
            } else {
                row.push('.')
            }
        }
        matrix.push(row)
    }
    const hash = getHash(matrix)
    if (lastHash !== hash) {
        lastHash = hash
        rounds++
        seats = matrix
        return true
    }
    return false
}

const countOccupied = (matrix: string[][]): number => {
    return matrix.reduce((accum, item) => {
        const m = item.join(',').match(/#/gm)
        if (m) {
            accum += m.length
        }
        return accum
    }, 0)
}

const getHash = (matrix: string[][]): string => {
    return matrix.reduce((accum, row) => {
        accum += row.join(',') + ','
        return accum
    }, '')
}

const start = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))
    size.rows = lines.filter(line => line.trim() !== '').length
    lines.forEach((line) => {
        const row = line.trim().split('')
        seats.push(row)
    })
    size.cols = seats[0].length

    let working: boolean = true
    while (working) {
        working = nextRound()
    }

    return countOccupied(seats)
}


export default start
