import readLines from '../readLines'
import path from 'path'

const getGroupsAnswers = (lines: string[]): number[] => {

    const groupsAnswers: number[] = []
    let tempAnswers: string[] = []

    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === '') {
            // new group
            groupsAnswers.push(tempAnswers.length)
            tempAnswers = []
        }
        const answers = lines[i].split('').filter((letter: string) => tempAnswers.indexOf(letter) < 0)
        tempAnswers = tempAnswers.concat(answers)
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
