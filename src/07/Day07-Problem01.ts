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
                    color: details[2]
                })
            }
        })
        const bag: IBag = {
            color: mainColor,
            content: contains,
            allowedColors: []
        }
        colorsTree.set(mainColor, bag)
    }
}

const findColor = (colorAsked: string): number => {
    return Array.from(colorsTree.values()).filter((bag: IBag) => (bag.allowedColors.indexOf(colorAsked) >= 0)).length
}

const getAllowedColors = (line: IBag): string[] => {
    const allowedColors: string[] = line.content.reduce((accum: string[], content) => {
        accum = accum.concat([content.color])
        if (colorsTree.has(content.color)) {
            const bag = colorsTree.get(content.color)
            if (bag) {
                accum = accum.concat(getAllowedColors(bag))
            }
        }
        return accum
    }, [])
    return allowedColors
}

const start = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))
    lines.forEach((line) => {
        parseLine(line)
    })

    // Array.from(colorsTree.values()).forEach((bag: IBag) => {
    //     console.log(bag)
    // })

    Array.from(colorsTree.keys()).forEach((color: string) => {
        const bag = colorsTree.get(color)
        if (bag) {
            bag.allowedColors = getAllowedColors(bag)
            colorsTree.set(bag.color, bag)
        }
    })
    const result = findColor('shiny gold')
    return result
}

start().then((result) => {
    console.log(`Result for color 'shiny gold': ${result}`)
}).catch(console.error)
