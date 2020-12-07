import path from 'path'
import fs from 'fs'

import Day01Problem01 from './01/Day01-Problem01'
import Day01Problem02 from './01/Day01-Problem02'

import Day02Problem01 from './02/Day02-Problem01'
import Day02Problem02 from './02/Day02-Problem02'

import Day03Problem01 from './03/Day03-Problem01'
import Day03Problem02 from './03/Day03-Problem02'

import Day04Problem01 from './04/Day04-Problem01'
import Day04Problem02 from './04/Day04-Problem02'

import Day05Problem01 from './05/Day05-Problem01'
import Day05Problem02 from './05/Day05-Problem02'

import Day06Problem01 from './06/Day06-Problem01'
import Day06Problem02 from './06/Day06-Problem02'

import Day07Problem01 from './07/Day07-Problem01'
import Day07Problem02 from './07/Day07-Problem02'

const bgRed = '\x1b[41m'
const fgYellow = '\x1b[33m'
const fgRed = '\x1b[31m'
const reset = '\x1b[0m'

const getTimeElapsed = (startTime: Date): number => {
    return Date.now() - startTime.getTime()
}

const runAll = async () => {
    const welcome = await fs.promises.readFile(path.join(__dirname, 'welcome.txt'))
    console.log(welcome.toString())
    const start = new Date()
    try {
        const startProblem01 = new Date()
        console.log(`    - Day 1, problem 1: ${await Day01Problem01()} (${getTimeElapsed(startProblem01)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem01b = new Date()
        console.log(`    - Day 1, problem 2: ${await Day01Problem02()} (${getTimeElapsed(startProblem01b)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem02 = new Date()
        console.log(`    - Day 2, problem 1: ${await Day02Problem01()} (${getTimeElapsed(startProblem02)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem02b = new Date()
        console.log(`    - Day 2, problem 2: ${await Day02Problem02()} (${getTimeElapsed(startProblem02b)} ms)`)
    } catch (e) {
        console.error(e)
    }

    try {
        const startProblem03 = new Date()
        console.log(`    - Day 3, problem 1: ${await Day03Problem01()} (${getTimeElapsed(startProblem03)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem03b = new Date()
        console.log(`    - Day 3, problem 2: ${await Day03Problem02()} (${getTimeElapsed(startProblem03b)} ms)`)
    } catch (e) {
        console.error(e)
    }

    try {
        const startProblem04 = new Date()
        console.log(`    - Day 4, problem 1: ${await Day04Problem01()} (${getTimeElapsed(startProblem04)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem04b = new Date()
        console.log(`    - Day 4, problem 2: ${await Day04Problem02()} (${getTimeElapsed(startProblem04b)} ms)`)
    } catch (e) {
        console.error(e)
    }

    try {
        const startProblem05 = new Date()
        console.log(`    - Day 5, problem 1: ${await Day05Problem01()} (${getTimeElapsed(startProblem05)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem05b = new Date()
        console.log(`    - Day 5, problem 2: ${await Day05Problem02()} (${getTimeElapsed(startProblem05b)} ms)`)
    } catch (e) {
        console.error(e)
    }

    try {
        const startProblem06 = new Date()
        console.log(`    - Day 6, problem 1: ${await Day06Problem01()} (${getTimeElapsed(startProblem06)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem06b = new Date()
        console.log(`    - Day 6, problem 2: ${await Day06Problem02()} (${getTimeElapsed(startProblem06b)} ms)`)
    } catch (e) {
        console.error(e)
    }

    try {
        const startProblem07 = new Date()
        console.log(`    - Day 7, problem 1: ${await Day07Problem01()} (${getTimeElapsed(startProblem07)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem07b = new Date()
        console.log(`    - Day 7, problem 2: ${await Day07Problem02()} (${getTimeElapsed(startProblem07b)} ms)`)
    } catch (e) {
        console.error(e)
    }
    console.log('\n***********************************************************************\n')
    const end = new Date()
    console.log(`Total time elapsed: ${end.getTime() - start.getTime()} ms`)
}

runAll().catch(console.error)
