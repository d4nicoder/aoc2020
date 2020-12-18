import readLines from '../readLines'
import path from 'path'

const evaluateSimple = (sentence: string): number => {
    // split spaces
    sentence = sentence.replace(/\s/gm, '')

    const multiplyItems = sentence.split('*')
    return multiplyItems.reduce((accum: number, miniSentence) => {
        const sum = miniSentence.split('+').map((n) => parseInt(n, 10)).reduce((a, n) => {
            return a+n
        }, 0)
        return accum*sum
    }, 1)
}

const evaluate = (sentence: string): number => {
    const splittedSentence = sentence.split('')
    let lastNum = 0
    let lastOperand = '+'
    if (!/[()]/.test(sentence)) {
        // No parenthesis
        return evaluateSimple(sentence)
    }

    let simplifiedSentence = ''
    for (let i = 0; i < splittedSentence.length; i++) {
        const item = splittedSentence[i].trim()
        if (item === '') {

        } else if (item === '(') {
            // Start parenthesis. Look for the closer parenthesis, and evaluate inside
            let level = 1
            let newSentence: string = ''
            let j = i + 1
            while (level > 0) {
                if (splittedSentence[j] === '(') {
                    level += 1
                } else if (splittedSentence[j] === ')') {
                    level -= 1
                    if (level === 0) {
                        const parenthesisValue = evaluate(newSentence)
                        simplifiedSentence += parenthesisValue.toString()
                        i = j + 1
                    }
                }
                newSentence += splittedSentence[j]
                j++
            }
        } else {
            simplifiedSentence += item
        }
    }

    return evaluate(simplifiedSentence)
}

const main = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))
    let results: number[] = []
    lines.forEach((line) => {
        results.push(evaluate(line))
    })
    return results.reduce((accum: number, res: number) => {
        accum += res
        return accum
    }, 0)
}

export default main
