import fs from 'fs'
import path from 'path'

const parseArray = (inputText: string): number[][] => {
    const lines = inputText.split('\n').filter((line) => line.trim() !== '')
    return lines.map((line) => {
        const lineArr = line.replace(/\./gm, '0').replace(/#/gm, '1').split('')
        return lineArr.map((item) => parseInt(item, 10))
    })
}

const findTrees = (rows: number[][]): number => {
    let column = 0
    let trees = 0
    for (let i = 0; i < rows.length; i++) {
        if (column >= rows[i].length) {
            column = column - rows[i].length
        }
        trees += rows[i][column]
        column += 3
    }
    return trees
}

const start = async () => {
    const inputData = await fs.promises.readFile(path.join(__dirname, 'input.txt'))
    const parsedArray = parseArray(inputData.toString())
    const numberOfTrees = findTrees(parsedArray)
    console.log(`Number of trees: ${numberOfTrees}`)
}

start().catch(console.error)
