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

const bgRed = '\x1b[41m'
const fgYellow = '\x1b[33m'
const fgRed = '\x1b[31m'
const reset = '\x1b[0m'

const runAll = async () => {
    const welcome = await fs.promises.readFile(path.join(__dirname, 'welcome.txt'))
    console.log(welcome.toString())
    const start = new Date()
    try {
        console.log(`    - Day 1, problem 1: ${await Day01Problem01()}`)
    } catch (e) {
        console.error(e)
    }
    try {
        console.log(`    - Day 1, problem 2: ${await Day01Problem02()}`)
    } catch (e) {
        console.error(e)
    }
    try {
        console.log(`    - Day 2, problem 1: ${await Day02Problem01()}`)
    } catch (e) {
        console.error(e)
    }
    try {
        console.log(`    - Day 2, problem 2: ${await Day02Problem02()}`)
    } catch (e) {
        console.error(e)
    }

    try {
        console.log(`    - Day 3, problem 1: ${await Day03Problem01()}`)
    } catch (e) {
        console.error(e)
    }
    try {
        console.log(`    - Day 3, problem 2: ${await Day03Problem02()}`)
    } catch (e) {
        console.error(e)
    }

    try {
        console.log(`    - Day 4, problem 1: ${await Day04Problem01()}`)
    } catch (e) {
        console.error(e)
    }
    try {
        console.log(`    - Day 4, problem 2: ${await Day04Problem02()}`)
    } catch (e) {
        console.error(e)
    }

    try {
        console.log(`    - Day 5, problem 1: ${await Day05Problem01()}`)
    } catch (e) {
        console.error(e)
    }
    try {
        console.log(`    - Day 5, problem 2: ${await Day05Problem02()}`)
    } catch (e) {
        console.error(e)
    }
    console.log('\n***********************************************************************\n')
    const end = new Date()
    console.log(`Total time elapsed: ${end.getTime() - start.getTime()} ms`)
}

runAll().catch(console.error)
