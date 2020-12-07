import readLines from '../readLines'
import path from 'path'

type IContain = {
    quantity: number;
    color: string;
}

type IBag = {
    color: string;
    content: IContain[],
    allowedColors: string[],
    allowedColorsNum: number
}
const colorsTree: Map<string, IBag> = new Map()

const parseLine = (line: string): void => {
    const regExpPrimaryColor = /^(.*) bags contain/
    const matched = line.match(regExpPrimaryColor)
    if (matched) {
        const mainColor: string = matched[1]
        const regexpContains = /([\d]+) (.*) bag[s]?/
        const contains: IContain[] = []
        line.split('contain')[1].split(',').forEach((part, index) => {
            const details = part.match(regexpContains)
            if (details) {
                contains.push({
                    quantity: parseInt(details[1], 10),
                    color: details[2],
                })
            }
        })
        const bag: IBag = {
            color: mainColor,
            content: contains,
            allowedColors: [],
            allowedColorsNum: 0,
        }
        colorsTree.set(mainColor, bag)
    }
}

const findNumber = (colorAsked: string): number => {
    const bag = colorsTree.get(colorAsked)
    if (bag) {
        return bag.allowedColorsNum
    }
    return -1
}
const getAllowedColors = (line: IBag, multiply: number): number => {
    const allowedColors: number = line.content.reduce((accum: number, content) => {
        accum += content.quantity * multiply
        if (colorsTree.has(content.color)) {
            const bag = colorsTree.get(content.color)
            if (bag) {
                accum += getAllowedColors(bag, content.quantity * multiply)
            }
        }
        return accum
    }, 0)
    return allowedColors
}

const start = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))
    lines.forEach((line) => {
        parseLine(line)
    })

    Array.from(colorsTree.keys()).forEach((color: string) => {
        const bag = colorsTree.get(color)
        if (bag) {
            bag.allowedColorsNum = getAllowedColors(bag, 1)
            colorsTree.set(bag.color, bag)
        }
    })
    const result = findNumber('shiny gold')
    return result
}

export default start
