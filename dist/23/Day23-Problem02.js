'use strict'
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const readLines_1   = __importDefault(require('../readLines'))
const path_1        = __importDefault(require('path'))
const MAX_LEVEL_LOG = 10
const initialCups   = []
const LENGTH        = 1000000
const ROUNDS        = 10000000
let MAX             = 1
let MIN             = 1
const CUPS          = new Map()
let NEXT            = -1
/**
 * This part needs a re-think. We can't use normal arrays because the performance is very low.
 * We will use hashmaps with the cup label as the index and the next cup label as the value.
 * So, instead rotate arrays, we will update the pointers in each iteration
 */
const log           = (message, level) => {
  level = typeof level !== 'number' ? 100 : level
  if (level <= MAX_LEVEL_LOG) {
    console.log(message)
  }
}
const buildCups     = (initialCups) => {
  const cups = [...initialCups].sort()
  cups.reverse()
  const max = cups[0]
  // build map
  for (let i = 0; i < initialCups.length; i++) {
    if (i + 1 === initialCups.length) {
      if (i + 1 === LENGTH) {
        CUPS.set(initialCups[i], initialCups[0])
      } else {
        CUPS.set(initialCups[i], max + 1)
      }
    } else {
      CUPS.set(initialCups[i], initialCups[i + 1])
    }
  }
  for (let i = initialCups.length + 1; i <= LENGTH; i++) {
    CUPS.set(i, i + 1)
    if (i === LENGTH) {
      CUPS.set(i, initialCups[0])
    }
  }
  NEXT = initialCups[0]
}
const newMove       = () => {
  const firstCup = CUPS.get(NEXT)
  if (!firstCup) {
    process.exit(1)
  }
  const secondCup = CUPS.get(firstCup)
  if (!secondCup) {
    process.exit(2)
  }
  const thirdCup = CUPS.get(secondCup)
  if (!thirdCup) {
    process.exit(3)
  }
  // NEXT will be the thirdCup pointer
  const next = CUPS.get(thirdCup)
  if (!next) {
    process.exit(4)
  }
  CUPS.set(NEXT, next)
  let destiny = NEXT - 1
  while ([firstCup, secondCup, thirdCup].indexOf(destiny) >= 0 || destiny < 1) {
    destiny--
    if (destiny < 1) {
      destiny = LENGTH
    }
  }
  const destinyNext = CUPS.get(destiny)
  if (!destinyNext) {
    process.exit(5)
  }
  // Destiny now points to firstCup
  CUPS.set(destiny, firstCup)
  // thirdCard now point to old destiny pointer
  CUPS.set(thirdCup, destinyNext)
  NEXT = next
}
const getNewResult  = () => {
  const first = CUPS.get(1)
  if (!first) {
    process.exit(7)
  }
  const second = CUPS.get(first)
  if (!second) {
    process.exit(8)
  }
  return first * second
}
const main          = async () => {
  const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'))
  lines[0].split('').forEach((digit) => {
    initialCups.push(parseInt(digit, 10))
  })
  buildCups(initialCups)
  for (let i = 0; i < ROUNDS; i++) {
    newMove()
  }
  return getNewResult()
}
exports.default     = main
