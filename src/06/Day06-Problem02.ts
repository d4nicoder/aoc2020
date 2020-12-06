import readLines from '../readLines'
import path from 'path'

const getGroupsAnswers = (lines: string[]): number[] => {

    const groupsAnswers: number[] = []
    let tempAnswers: Map<string, number> = new Map()
    let peopleInGroup: number = 0

    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === '') {
            // new group
            let validAnswers = 0
            for (let letter of Array.from(tempAnswers.keys())) {
                const times = tempAnswers.get(letter)
                if (times && times === peopleInGroup) {
                    validAnswers ++
                }
            }
            groupsAnswers.push(validAnswers)
            tempAnswers = new Map()
            peopleInGroup = 0
        } else {
            const answers = lines[i].split('')
            for (let r = 0; r < answers.length; r++) {
                const letter = answers[r]
                if (tempAnswers.has(letter)) {
                    const times = tempAnswers.get(letter)
                    if (typeof times === 'number') {
                        tempAnswers.set(letter, times + 1)
                    }
                } else {
                    tempAnswers.set(letter, 1)
                }
            }
            peopleInGroup++
        }
    }
    return groupsAnswers
}

const getTotalAnswers = (answers: number[]): number => {
    return answers.reduce((accum: number, item: number) => {
        accum += item
        return accum
    }, 0)
}
const start = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'), true)
    const groupsAnswers: number[] = getGroupsAnswers(lines)

    return getTotalAnswers(groupsAnswers)
}
export default start
