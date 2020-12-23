'use strict'
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const readLines_1   = __importDefault(require('../readLines'))
const path_1        = __importDefault(require('path'))
const MAX_LEVEL_LOG = 0
const initialCups   = []
const log           = (message, level) => {
  level = typeof level !== 'number' ? 100 : level
  if (level <= MAX_LEVEL_LOG) {
    console.log(message)
  }
}
let moves           = 0
const rotate        = (arr, times) => {
  for (let i = 0; i < times; i++) {
    arr.unshift(arr.pop())
  }
  return arr
}
const move          = (cups) => {
  log(`=== MOVE ${ moves++ + 1 } ===`)
  log(`cups: ${ cups.join(',') }`)
  const currentCup  = (moves - 1) % cups.length
  // Rotate (currentCup) times anti clockwise
  const firstRotate = cups.length - currentCup
  log(`First rotate -${ cups.length - firstRotate }`)
  cups = rotate(cups, firstRotate)
  log(`Current cup pos: 0 (${ cups[0] })`)
  const label     = cups[0]
  const startPick = 1
  let picked      = cups.splice(1, 3)
  log(`Cups after pick: ${ cups.join(',') }`)
  const lessValue = [...cups].sort()[0]
  const highValue = [...cups].sort()[cups.length - 1]
  log(`Less value: ${ lessValue }`)
  log(`High value: ${ highValue }`)
  let destination = label - 1
  while (cups.indexOf(destination) < 0) {
    destination--
    if (destination < lessValue) {
      destination = highValue
    }
  }
  let destinationIndex = cups.indexOf(destination)
  log(`pick up: ${ picked.join(',') }`)
  log(`Destination: ${ destination } (${ destinationIndex })`)
  picked.forEach((num, index) => {
    cups.splice(1 + destinationIndex + index, 0, num)
  })
  // Lets rotate
  const secondRotate = cups.length - firstRotate
  log(`Second rotate ${ secondRotate }`)
  return rotate(cups, secondRotate)
}
const getResult     = (cups) => {
  const idx = cups.indexOf(1)
  const k   = cups.length - idx
  cups      = rotate(cups, k)
  return cups.reduce((accum, num) => {
    if (num !== 1) {
      accum += num.toString()
    }
    return accum
  }, '')
}
const main          = async () => {
  const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'))
  lines[0].split('').forEach((digit) => {
    initialCups.push(parseInt(digit, 10))
  })
  log(initialCups.join(','))
  let cups = [...initialCups]
  for (let i = 0; i < 100; i++) {
    cups = move([...cups])
    log(cups.join(','))
  }
  return getResult(cups)
}
exports.default     = main
