import readLines from '../readLines'
import path from 'path'
import { main } from 'ts-node/dist/bin'

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
const colorParents: Map<string, string[]> = new Map()

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

                // store the parents
                if (colorParents.has(details[2])) {
                    const colorP = colorParents.get(details[2])
                    if (colorP) {
                        if (colorP.indexOf(mainColor) < 0) {
                            colorP.push(mainColor)
                        }
                        colorParents.set(details[2], colorP)
                    }
                } else {
                    colorParents.set(details[2], [mainColor])
                }
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

const stripDuplicated = (colors: string[]): string[] => {
    const finalColors: string[] = []
    colors.forEach((color) => {
        if (finalColors.indexOf(color) < 0) {
            finalColors.push(color)
        }
    })
    return finalColors
}


const findColor2 = (colorAsked: string): string[] => {
    let total: string[] = []
    const colorDetails = colorParents.get(colorAsked)
    if (colorDetails) {
        total = total.concat(colorDetails)
        total = colorDetails.reduce((accum: string[], color: string) => {
            accum = accum.concat(findColor2(color))
            accum = stripDuplicated(accum)
            return accum
        }, total)
    }
    return total
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

    const result = findColor2('shiny gold')
    return result.length
}

export default start
