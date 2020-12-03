import fs from 'fs'
import path from 'path'

const parseArray = (inputText: string): number[][] => {
    const lines = inputText.split('\n').filter((line) => line.trim() !== '')
    return lines.map((line) => {
        const lineArr = line.replace(/\./gm, '0').replace(/#/gm, '1').split('')
        return lineArr.map((item) => parseInt(item, 10))
    })
}

const findTrees = (rows: number[][], right: number, down: number): number => {
    let column = 0
    let trees = 0
    let i: number = 0
    while (i < rows.length) {
        if (column >= rows[i].length) {
            column = column - rows[i].length
        }
        trees += rows[i][column]
        column += right
        i += down
    }
    return trees
}

const start = async () => {
    const inputData = await fs.promises.readFile(path.join(__dirname, 'input.txt'))
    const parsedArray = parseArray(inputData.toString())

    const slopes: number[][] = [[1, 1],[3, 1], [5, 1], [7, 1], [1, 2]]
    const result: number = slopes.reduce((accum: number, slope: number[]) => {
        const trees = findTrees(parsedArray, slope[0], slope[1])
        return accum * trees
    }, 1)
    console.log(`Magic number: ${result}`)
}

start().catch(console.error)
