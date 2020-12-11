import readLines from '../readLines'
import path from 'path'
import crypto from 'crypto'


let seats: string[][] = []
let lastHash: string = ''
let rounds: number = 0

const getAdyacentNum = (row: number, col: number): number => {
    let num: number = 0

    const prevRow = row > 0 ? row - 1 : row
    const nextRow = row === seats.length - 1 ? row : row + 1
    const prevCol = col > 0 ? col - 1 : col
    const nextCol = col === seats[0].length - 1 ? col : col + 1
    for (let r = prevRow; r <= nextRow; r++) {
        for (let c = prevCol; c <= nextCol; c++) {
            if (r !== row || c !== col) {
                if (seats[r][c] === '#') {
                    num++
                }
            }
        }
    }
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
                    matrix += 'L'
                }
            } else if (itemType === '#') {
                if (adjacent >= 4) {
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
