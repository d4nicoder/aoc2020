import readLines from '../readLines'
import path from 'path'

let seats: string[][] = []
let lastHash: string = ''
let rounds: number = 0

let size = {
    rows: 0,
    cols: 0
}

const getAdjacentNum = (row: number, col: number): number => {
    let num: number = 0

    const prevRow = row > 0 ? row - 1 : row
    const nextRow = row === size.rows - 1 ? row : row + 1
    const prevCol = col > 0 ? col - 1 : col
    const nextCol = col === size.cols - 1 ? col : col + 1
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
                if (adjacent >= 4) {
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
    size.rows = lines.filter((l) => l.trim() !== '').length

    lines.forEach((line) => {
        const row = line.trim().split('')
        seats.push(row)
    })

    size.cols = lines[0].length

    let working: boolean = true
    while (working) {
        working = nextRound()
    }

    return countOccupied(seats)
}

export default start
