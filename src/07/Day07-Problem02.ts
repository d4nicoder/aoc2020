import readLines from '../readLines'
import path from 'path'

type IContain = {
    quantity: number;
    color: string;
}

type IBag = {
    color: string;
    content: IContain[];
}
const colorsTree: Map<string, IBag> = new Map()

const parseLine = (line: string): void => {
    const regExpPrimaryColor = /^(.*) bags contain/
    const matched = line.match(regExpPrimaryColor)
    if (matched) {
        const mainColor: string = matched[1]
        const regexpContains = /([\d]+) (.*) bag[s]?/
        const contains: IContain[] = []
        line.split('contain')[1].split(',').forEach((part) => {
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
            content: contains
        }
        colorsTree.set(mainColor, bag)
    }
}

const findChilds = (colorAsked: string): number => {
    let childs: number = 0
    const details = colorsTree.get(colorAsked)
    if (details) {
        childs = details.content.reduce((accum: number, color) => {
            accum += color.quantity + (findChilds(color.color) * color.quantity)
            return accum
        }, 0)
    }
    return childs
}

const start = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))
    lines.forEach((line) => {
        parseLine(line)
    })
    return findChilds('shiny gold')
}

export default start
