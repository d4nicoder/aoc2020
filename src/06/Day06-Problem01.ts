import readLines from '../readLines'
import path from 'path'

const getGroupsResponses = (lines: string[]): number[] => {

    const groupsResponses: number[] = []
    let tempResponses: string[] = []

    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === '') {
            // new group
            groupsResponses.push(tempResponses.length)
            tempResponses = []
        }
        const responses = lines[i].split('').filter((letter: string) => tempResponses.indexOf(letter) < 0)
        tempResponses = tempResponses.concat(responses)
    }
    return groupsResponses
}

const getTotalResponses = (answers: number[]): number => {
    return answers.reduce((accum: number, item: number) => {
        accum += item
        return accum
    }, 0)
}
const start = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'), true)
    const groupsResponses: number[] = getGroupsResponses(lines)

    return getTotalResponses(groupsResponses)
}

export default start
