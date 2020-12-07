import readLines from '../readLines'
import path from 'path'

const colorParents: Map<string, string[]> = new Map()

const parseLine = (line: string): void => {
    const regExpPrimaryColor = /^(.*) bags contain/
    const matched = line.match(regExpPrimaryColor)
    if (matched) {
        const mainColor: string = matched[1]
        const regexpContains = /([\d]+) (.*) bag[s]?/
        line.split('contain')[1].split(',').forEach((part) => {
            const details = part.match(regexpContains)
            if (details) {
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


const findColor = (colorAsked: string): string[] => {
    let total: string[] = []
    const colorDetails = colorParents.get(colorAsked)
    if (colorDetails) {
        total = total.concat(colorDetails)
        total = colorDetails.reduce((accum: string[], color: string) => {
            accum = accum.concat(findColor(color))
            accum = stripDuplicated(accum)
            return accum
        }, total)
    }
    return total
}

const start = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))
    lines.forEach((line) => {
        parseLine(line)
    })

    const result = findColor('shiny gold')
    return result.length
}

export default start
