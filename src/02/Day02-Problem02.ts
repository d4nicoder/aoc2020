import fs from 'fs'
import path from 'path'

type IPasswordDetails = {
    min: number;
    max: number;
    letter: string;
    password: string;
}

const checkLetterTimes = (password: string, letter: string, min: number, max: number): boolean => {
    const minPositionContainsLetter: number = password.charAt(min -1) === letter ? 1 : 0
    const maxPositionContainsLetter: number = password.charAt(max -1) === letter ? 1 : 0
    const isNewPolicyCompliant: boolean = minPositionContainsLetter + maxPositionContainsLetter === 1
    return (isNewPolicyCompliant)
}

const parseLine = (line: string): IPasswordDetails => {
    const regex = /^(\d+)-(\d+)\s(\w):\s([\w]+)$/
    const lineData = line.match(regex)
    if (!lineData) {
        throw new Error('Bad line format')
    }
    return {
        min: parseInt(lineData[1], 10),
        max: parseInt(lineData[2], 10),
        letter: lineData[3],
        password: lineData[4]
    }
}

const validPasswords = (lines: string[]): number => {
    const validPasswords: (IPasswordDetails | null)[] = lines.map((line) => {
        let data: IPasswordDetails | null
        try {
            data = parseLine(line)
        } catch (e) {
            console.error(`${line} password info invalid`)
            data = null
        }
        return data
    }).filter((lineData) => {
        if (!lineData) {
            return false
        }
        return checkLetterTimes(lineData.password, lineData.letter, lineData.min, lineData.max)
    })
    return validPasswords.length
}
const start = async () => {
    console.log(`Advent Of Code 2020.`)
    console.log(`Day 02 problem nº 2`)
    console.log(`=================================`)
    const sampleData = [
        '1-3 a: abcde',
        '1-3 b: cdefg',
        '2-9 c: ccccccccc'
    ]

    const validPasswordInSample: number = validPasswords(sampleData)
    console.log(`    - ${validPasswordInSample} valid passwords in sample data`)

    const inputFile = await fs.promises.readFile(path.join(__dirname, 'input.txt'))
    const inputFileData = inputFile.toString().split('\n').filter((line) => line.trim() !== '')
    const validPasswordsInInput: number = validPasswords(inputFileData)
    console.log(`    - ${validPasswordsInInput} valid password in input data`)
}

export default start
