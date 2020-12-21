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

import Day08Problem01 from './08/Day08-Problem01'
import Day08Problem02 from './08/Day08-Problem02'

import Day09Problem01 from './09/Day09-Problem01'
import Day09Problem02 from './09/Day09-Problem02'

import Day10Problem01 from './10/Day10-Problem01'
import Day10Problem02 from './10/Day10-Problem02'

import Day11Problem01 from './11/Day11-Problem01'
import Day11Problem02 from './11/Day11-Problem02'

import Day12Problem01 from './12/Day12-Problem01'
import Day12Problem02 from './12/Day12-Problem02'

import Day13Problem01 from './13/Day13-Problem01'
import Day13Problem02 from './13/Day13-Problem02'

import Day14Problem01 from './14/Day14-Problem01'
import Day14Problem02 from './14/Day14-Problem02'

import Day15Problem01 from './15/Day15-Problem01'
import Day15Problem02 from './15/Day15-Problem02'

import Day16Problem01 from './16/Day16-Problem01'
import Day16Problem02 from './16/Day16-Problem02'

import Day17Problem01 from './17/Day17-Problem01'
import Day17Problem02 from './17/Day17-Problem02'

import Day18Problem01 from './18/Day18-Problem01'
import Day18Problem02 from './18/Day18-Problem02'

import Day19Problem01 from './19/Day19-Problem01'
import Day19Problem02 from './19/Day19-Problem02'

import Day21Problem01 from './21/Day21-Problem01'
import Day21Problem02 from './21/Day21-Problem02'


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

    try {
        const startProblem08 = new Date()
        console.log(`    - Day 8, problem 1: ${await Day08Problem01()} (${getTimeElapsed(startProblem08)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem08b = new Date()
        console.log(`    - Day 8, problem 2: ${await Day08Problem02()} (${getTimeElapsed(startProblem08b)} ms)`)
    } catch (e) {
        console.error(e)
    }

    try {
        const startProblem09 = new Date()
        console.log(`    - Day 9, problem 1: ${await Day09Problem01()} (${getTimeElapsed(startProblem09)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem09b = new Date()
        console.log(`    - Day 9, problem 2: ${await Day09Problem02()} (${getTimeElapsed(startProblem09b)} ms)`)
    } catch (e) {
        console.error(e)
    }


    try {
        const startProblem10 = new Date()
        console.log(`    - Day 10, problem 1: ${await Day10Problem01()} (${getTimeElapsed(startProblem10)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem10b = new Date()
        console.log(`    - Day 10, problem 2: ${await Day10Problem02()} (${getTimeElapsed(startProblem10b)} ms)`)
    } catch (e) {
        console.error(e)
    }

    try {
        const startProblem11 = new Date()
        console.log(`    - Day 11, problem 1: ${await Day11Problem01()} (${getTimeElapsed(startProblem11)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem11b = new Date()
        console.log(`    - Day 11, problem 2: ${await Day11Problem02()} (${getTimeElapsed(startProblem11b)} ms)`)
    } catch (e) {
        console.error(e)
    }

    try {
        const startProblem12 = new Date()
        console.log(`    - Day 12, problem 1: ${await Day12Problem01()} (${getTimeElapsed(startProblem12)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem12b = new Date()
        console.log(`    - Day 12, problem 2: ${await Day12Problem02()} (${getTimeElapsed(startProblem12b)} ms)`)
    } catch (e) {
        console.error(e)
    }

    try {
        const startProblem13 = new Date()
        console.log(`    - Day 13, problem 1: ${await Day13Problem01()} (${getTimeElapsed(startProblem13)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem13b = new Date()
        console.log(`    - Day 13, problem 2: ${await Day13Problem02()} (${getTimeElapsed(startProblem13b)} ms)`)
    } catch (e) {
        console.error(e)
    }

    try {
        const startProblem14 = new Date()
        console.log(`    - Day 14, problem 1: ${await Day14Problem01()} (${getTimeElapsed(startProblem14)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem14b = new Date()
        console.log(`    - Day 14, problem 2: ${await Day14Problem02()} (${getTimeElapsed(startProblem14b)} ms)`)
    } catch (e) {
        console.error(e)
    }

    try {
        const startProblem15 = new Date()
        console.log(`    - Day 15, problem 1: ${await Day15Problem01()} (${getTimeElapsed(startProblem15)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem15b = new Date()
        console.log(`    - Day 15, problem 2: ${await Day15Problem02()} (${getTimeElapsed(startProblem15b)} ms. Needs optimization... maybe one day ;) )`)
    } catch (e) {
        console.error(e)
    }

    try {
        const startProblem16 = new Date()
        console.log(`    - Day 16, problem 1: ${await Day16Problem01()} (${getTimeElapsed(startProblem16)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem16b = new Date()
        console.log(`    - Day 16, problem 2: ${await Day16Problem02()} (${getTimeElapsed(startProblem16b)} ms)`)
    } catch (e) {
        console.error(e)
    }


    try {
        const startProblem17 = new Date()
        console.log(`    - Day 17, problem 1: ${await Day17Problem01()} (${getTimeElapsed(startProblem17)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem17b = new Date()
        console.log(`    - Day 17, problem 2: ${await Day17Problem02()} (${getTimeElapsed(startProblem17b)} ms)`)
    } catch (e) {
        console.error(e)
    }

    try {
        const startProblem18 = new Date()
        console.log(`    - Day 18, problem 1: ${await Day18Problem01()} (${getTimeElapsed(startProblem18)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem18b = new Date()
        console.log(`    - Day 18, problem 2: ${await Day18Problem02()} (${getTimeElapsed(startProblem18b)} ms)`)
    } catch (e) {
        console.error(e)
    }


    try {
        const startProblem19 = new Date()
        console.log(`    - Day 19, problem 1: ${await Day19Problem01()} (${getTimeElapsed(startProblem19)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem19b = new Date()
        console.log(`    - Day 19, problem 2: ${await Day19Problem02()} (${getTimeElapsed(startProblem19b)} ms)`)
    } catch (e) {
        console.error(e)
    }



    try {
        const startProblem21 = new Date()
        console.log(`    - Day 21, problem 1: ${await Day21Problem01()} (${getTimeElapsed(startProblem21)} ms)`)
    } catch (e) {
        console.error(e)
    }
    try {
        const startProblem21b = new Date()
        console.log(`    - Day 21, problem 2: ${await Day21Problem02()} (${getTimeElapsed(startProblem21b)} ms)`)
    } catch (e) {
        console.error(e)
    }


    console.log('\n***********************************************************************\n')
    const end = new Date()
    console.log(`Total time elapsed: ${end.getTime() - start.getTime()} ms`)
}

runAll().catch(console.error)
