import readLines from '../readLines'
import path from 'path'

const rules: Map<number, string> = new Map()
const computedRules: Map<string, string> = new Map()
const messages: string[] = []

const letter = /[ab]/
const pipe = /\|/


const parseLine = (line: string): void => {
    if (/^\d+:/.test(line)) {
        // Its a rule
        const [index, rule] = line.split(':')
        rules.set(parseInt(index, 10), rule.trim())
    } else {
        // its content
        messages.push(line.trim())
    }
}

const processRule = (value: string): string => {
    if (computedRules.has(value)) {
        const r = computedRules.get(value)
        if (r) {
            return r
        }
    }

    let computedResult: string = ''
    if (pipe.test(value)) {
        const items = value.split(' | ').map(i => i.trim())
        computedResult = `(${processRule(items[0])}|${processRule(items[1])})`
    } else if (letter.test(value)) {
        computedResult = value.replace(/"/gm, '')
    } else {
        const items = value.split(' ')
        computedResult = items.map((i) => {
            const val = rules.get(parseInt(i, 10)) || ''
            return processRule(val)
        }).join('')
    }
    computedRules.set(value, computedResult)
    return computedResult
}

const main = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))
    lines.forEach((line) => {
        parseLine(line)
    })
    const root = rules.get(0) || ''
    const a = new RegExp(`^${processRule(root)}$`)

    return messages.reduce((accum: number, m) => {
        if (a.test(m)) {
            accum += 1
        }
        return accum
    }, 0)
}

export default main

main().then((result) => {
    console.log(`Result ${result}`)
}).catch(console.error)
