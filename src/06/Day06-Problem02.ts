import readLines from '../readLines'
import path from 'path'

const getGroupsResponses = (lines: string[]): number[] => {

    const groupsResponses: number[] = []
    let tempResponses: Map<string, number> = new Map()
    let peopleInGroup: number = 0

    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === '') {
            // new group
            let validResponses = 0
            for (let letter of Array.from(tempResponses.keys())) {
                const times = tempResponses.get(letter)
                if (times && times === peopleInGroup) {
                    validResponses ++
                }
            }
            groupsResponses.push(validResponses)
            tempResponses = new Map()
            peopleInGroup = 0
        } else {
            const responses = lines[i].split('')
            for (let r = 0; r < responses.length; r++) {
                const letter = responses[r]
                if (tempResponses.has(letter)) {
                    const times = tempResponses.get(letter)
                    if (typeof times === 'number') {
                        tempResponses.set(letter, times + 1)
                    }
                } else {
                    tempResponses.set(letter, 1)
                }
            }
            peopleInGroup++
        }
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
