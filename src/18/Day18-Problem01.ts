import readLines from '../readLines'
import path from 'path'

const evaluate = (sentence: string): number => {
    const splittedSentence = sentence.split('')
    let lastNum = 0
    let lastOperand = '+'
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
                        if (lastOperand === '+') {
                            lastNum = lastNum + parenthesisValue
                        } else if (lastOperand === '*') {
                            lastNum = lastNum * parenthesisValue
                        }

                        i = j + 1
                    }
                }
                newSentence += splittedSentence[j]
                j++
            }
        } else if (/^\d+$/.test(item)) {
            const num = parseInt(item, 10)
            if (lastOperand === '+') {
                lastNum = lastNum + num
            } else if (lastOperand === '*') {
                lastNum = lastNum * num
            }
        } else if (/^[+*]$/.test(item)) {
            lastOperand = item
        }
    }

    return lastNum
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
