'use strict'
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const path_1            = __importDefault(require('path'))
const fs_1              = __importDefault(require('fs'))
const Day01_Problem01_1 = __importDefault(require('./01/Day01-Problem01'))
const Day01_Problem02_1 = __importDefault(require('./01/Day01-Problem02'))
const Day02_Problem01_1 = __importDefault(require('./02/Day02-Problem01'))
const Day02_Problem02_1 = __importDefault(require('./02/Day02-Problem02'))
const Day03_Problem01_1 = __importDefault(require('./03/Day03-Problem01'))
const Day03_Problem02_1 = __importDefault(require('./03/Day03-Problem02'))
const Day04_Problem01_1 = __importDefault(require('./04/Day04-Problem01'))
const Day04_Problem02_1 = __importDefault(require('./04/Day04-Problem02'))
const Day05_Problem01_1 = __importDefault(require('./05/Day05-Problem01'))
const Day05_Problem02_1 = __importDefault(require('./05/Day05-Problem02'))
const Day06_Problem01_1 = __importDefault(require('./06/Day06-Problem01'))
const Day06_Problem02_1 = __importDefault(require('./06/Day06-Problem02'))
const Day07_Problem01_1 = __importDefault(require('./07/Day07-Problem01'))
const Day07_Problem02_1 = __importDefault(require('./07/Day07-Problem02'))
const Day08_Problem01_1 = __importDefault(require('./08/Day08-Problem01'))
const Day08_Problem02_1 = __importDefault(require('./08/Day08-Problem02'))
const Day09_Problem01_1 = __importDefault(require('./09/Day09-Problem01'))
const Day09_Problem02_1 = __importDefault(require('./09/Day09-Problem02'))
const Day10_Problem01_1 = __importDefault(require('./10/Day10-Problem01'))
const Day10_Problem02_1 = __importDefault(require('./10/Day10-Problem02'))
const Day11_Problem01_1 = __importDefault(require('./11/Day11-Problem01'))
const Day11_Problem02_1 = __importDefault(require('./11/Day11-Problem02'))
const Day12_Problem01_1 = __importDefault(require('./12/Day12-Problem01'))
const Day12_Problem02_1 = __importDefault(require('./12/Day12-Problem02'))
const Day13_Problem01_1 = __importDefault(require('./13/Day13-Problem01'))
const Day13_Problem02_1 = __importDefault(require('./13/Day13-Problem02'))
const Day14_Problem01_1 = __importDefault(require('./14/Day14-Problem01'))
const Day14_Problem02_1 = __importDefault(require('./14/Day14-Problem02'))
const Day15_Problem01_1 = __importDefault(require('./15/Day15-Problem01'))
const Day15_Problem02_1 = __importDefault(require('./15/Day15-Problem02'))
const Day16_Problem01_1 = __importDefault(require('./16/Day16-Problem01'))
const Day16_Problem02_1 = __importDefault(require('./16/Day16-Problem02'))
const Day17_Problem01_1 = __importDefault(require('./17/Day17-Problem01'))
const Day17_Problem02_1 = __importDefault(require('./17/Day17-Problem02'))
const Day18_Problem01_1 = __importDefault(require('./18/Day18-Problem01'))
const Day18_Problem02_1 = __importDefault(require('./18/Day18-Problem02'))
const Day19_Problem01_1 = __importDefault(require('./19/Day19-Problem01'))
const Day19_Problem02_1 = __importDefault(require('./19/Day19-Problem02'))
const Day20_Problem01_1 = __importDefault(require('./20/Day20-Problem01'))
const Day20_Problem02_1 = __importDefault(require('./20/Day20-Problem02'))
const Day21_Problem01_1 = __importDefault(require('./21/Day21-Problem01'))
const Day21_Problem02_1 = __importDefault(require('./21/Day21-Problem02'))
const Day22_Problem01_1 = __importDefault(require('./22/Day22-Problem01'))
const Day22_Problem02_1 = __importDefault(require('./22/Day22-Problem02'))
const Day23_Problem01_1 = __importDefault(require('./23/Day23-Problem01'))
const Day23_Problem02_1 = __importDefault(require('./23/Day23-Problem02'))
const Day24_Problem01_1 = __importDefault(require('./24/Day24-Problem01'))
const Day24_Problem02_1 = __importDefault(require('./24/Day24-Problem02'))
const Day25_Problem01_1 = __importDefault(require('./25/Day25-Problem01'))
const bgRed             = '\x1b[41m'
const fgYellow          = '\x1b[33m'
const fgRed             = '\x1b[31m'
const reset             = '\x1b[0m'
const getTimeElapsed    = (startTime) => {
  return Date.now() - startTime.getTime()
}
const runAll            = async () => {
  const welcome = await fs_1.default.promises.readFile(path_1.default.join(__dirname, 'welcome.txt'))
  console.log(welcome.toString())
  const start = new Date()
  try {
    const startProblem01 = new Date()
    console.log(`    - Day 1, problem 1: ${ await Day01_Problem01_1.default() } (${ getTimeElapsed(startProblem01) } ms)`)
  } catch (e) {
    console.error(e)
  }
  try {
    const startProblem01b = new Date()
    console.log(`    - Day 1, problem 2: ${ await Day01_Problem02_1.default() } (${ getTimeElapsed(startProblem01b) } ms)`)
  } catch (e) {
    console.error(e)
  }
  try {
    const startProblem02 = new Date()
    console.log(`    - Day 2, problem 1: ${ await Day02_Problem01_1.default() } (${ getTimeElapsed(startProblem02) } ms)`)
  } catch (e) {
    console.error(e)
  }
  try {
    const startProblem02b = new Date()
    console.log(`    - Day 2, problem 2: ${ await Day02_Problem02_1.default() } (${ getTimeElapsed(startProblem02b) } ms)`)
  } catch (e) {
    console.error(e)
  }
  try {
    const startProblem03 = new Date()
    console.log(`    - Day 3, problem 1: ${ await Day03_Problem01_1.default() } (${ getTimeElapsed(startProblem03) } ms)`)
  } catch (e) {
    console.error(e)
  }
  try {
    const startProblem03b = new Date()
    console.log(`    - Day 3, problem 2: ${ await Day03_Problem02_1.default() } (${ getTimeElapsed(startProblem03b) } ms)`)
  }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem04 = new Date();
        console.log(`    - Day 4, problem 1: ${await Day04_Problem01_1.default()} (${getTimeElapsed(startProblem04)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem04b = new Date();
        console.log(`    - Day 4, problem 2: ${await Day04_Problem02_1.default()} (${getTimeElapsed(startProblem04b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem05 = new Date();
        console.log(`    - Day 5, problem 1: ${await Day05_Problem01_1.default()} (${getTimeElapsed(startProblem05)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem05b = new Date();
        console.log(`    - Day 5, problem 2: ${await Day05_Problem02_1.default()} (${getTimeElapsed(startProblem05b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem06 = new Date();
        console.log(`    - Day 6, problem 1: ${await Day06_Problem01_1.default()} (${getTimeElapsed(startProblem06)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem06b = new Date();
        console.log(`    - Day 6, problem 2: ${await Day06_Problem02_1.default()} (${getTimeElapsed(startProblem06b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem07 = new Date();
        console.log(`    - Day 7, problem 1: ${await Day07_Problem01_1.default()} (${getTimeElapsed(startProblem07)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem07b = new Date();
        console.log(`    - Day 7, problem 2: ${await Day07_Problem02_1.default()} (${getTimeElapsed(startProblem07b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem08 = new Date();
        console.log(`    - Day 8, problem 1: ${await Day08_Problem01_1.default()} (${getTimeElapsed(startProblem08)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem08b = new Date();
        console.log(`    - Day 8, problem 2: ${await Day08_Problem02_1.default()} (${getTimeElapsed(startProblem08b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem09 = new Date();
        console.log(`    - Day 9, problem 1: ${await Day09_Problem01_1.default()} (${getTimeElapsed(startProblem09)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem09b = new Date();
        console.log(`    - Day 9, problem 2: ${await Day09_Problem02_1.default()} (${getTimeElapsed(startProblem09b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem10 = new Date();
        console.log(`    - Day 10, problem 1: ${await Day10_Problem01_1.default()} (${getTimeElapsed(startProblem10)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem10b = new Date();
        console.log(`    - Day 10, problem 2: ${await Day10_Problem02_1.default()} (${getTimeElapsed(startProblem10b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem11 = new Date();
        console.log(`    - Day 11, problem 1: ${await Day11_Problem01_1.default()} (${getTimeElapsed(startProblem11)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem11b = new Date();
        console.log(`    - Day 11, problem 2: ${await Day11_Problem02_1.default()} (${getTimeElapsed(startProblem11b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem12 = new Date();
        console.log(`    - Day 12, problem 1: ${await Day12_Problem01_1.default()} (${getTimeElapsed(startProblem12)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem12b = new Date();
        console.log(`    - Day 12, problem 2: ${await Day12_Problem02_1.default()} (${getTimeElapsed(startProblem12b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem13 = new Date();
        console.log(`    - Day 13, problem 1: ${await Day13_Problem01_1.default()} (${getTimeElapsed(startProblem13)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem13b = new Date();
        console.log(`    - Day 13, problem 2: ${await Day13_Problem02_1.default()} (${getTimeElapsed(startProblem13b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem14 = new Date();
        console.log(`    - Day 14, problem 1: ${await Day14_Problem01_1.default()} (${getTimeElapsed(startProblem14)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem14b = new Date();
        console.log(`    - Day 14, problem 2: ${await Day14_Problem02_1.default()} (${getTimeElapsed(startProblem14b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem15 = new Date();
        console.log(`    - Day 15, problem 1: ${await Day15_Problem01_1.default()} (${getTimeElapsed(startProblem15)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem15b = new Date();
        console.log(`    - Day 15, problem 2: ${await Day15_Problem02_1.default()} (${getTimeElapsed(startProblem15b)} ms. Needs optimization... maybe one day ;) )`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem16 = new Date();
        console.log(`    - Day 16, problem 1: ${await Day16_Problem01_1.default()} (${getTimeElapsed(startProblem16)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem16b = new Date();
        console.log(`    - Day 16, problem 2: ${await Day16_Problem02_1.default()} (${getTimeElapsed(startProblem16b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem17 = new Date();
        console.log(`    - Day 17, problem 1: ${await Day17_Problem01_1.default()} (${getTimeElapsed(startProblem17)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem17b = new Date();
        console.log(`    - Day 17, problem 2: ${await Day17_Problem02_1.default()} (${getTimeElapsed(startProblem17b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem18 = new Date();
        console.log(`    - Day 18, problem 1: ${await Day18_Problem01_1.default()} (${getTimeElapsed(startProblem18)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem18b = new Date();
        console.log(`    - Day 18, problem 2: ${await Day18_Problem02_1.default()} (${getTimeElapsed(startProblem18b)} ms)`);
    }
    catch (e) {
        console.error(e);
    }
    try {
        const startProblem19 = new Date();
        console.log(`    - Day 19, problem 1: ${await Day19_Problem01_1.default()} (${getTimeElapsed(startProblem19)} ms)`);
    } catch (e) {
      console.error(e)
    }
  try {
    const startProblem19b = new Date()
    console.log(`    - Day 19, problem 2: ${ await Day19_Problem02_1.default() } (${ getTimeElapsed(startProblem19b) } ms)`)
  } catch (e) {
    console.error(e)
  }
  try {
    const startProblem20 = new Date()
    console.log(`    - Day 20, problem 1: ${ await Day20_Problem01_1.default() } (${ getTimeElapsed(startProblem20) } ms)`)
  } catch (e) {
    console.error(e)
  }
  try {
    const startProblem20b = new Date()
    console.log(`    - Day 20, problem 2: ${ await Day20_Problem02_1.default() } (${ getTimeElapsed(startProblem20b) } ms)`)
  } catch (e) {
    console.error(e)
  }
  try {
    const startProblem21 = new Date()
    console.log(`    - Day 21, problem 1: ${ await Day21_Problem01_1.default() } (${ getTimeElapsed(startProblem21) } ms)`)
  } catch (e) {
    console.error(e)
  }
  try {
    const startProblem21b = new Date()
    console.log(`    - Day 21, problem 2: ${ await Day21_Problem02_1.default() } (${ getTimeElapsed(startProblem21b) } ms)`)
  } catch (e) {
    console.error(e)
  }
  try {
    const startProblem22 = new Date()
    console.log(`    - Day 22, problem 1: ${ await Day22_Problem01_1.default() } (${ getTimeElapsed(startProblem22) } ms)`)
  } catch (e) {
    console.error(e)
  }
  try {
    const startProblem22b = new Date()
    console.log(`    - Day 22, problem 2: ${ await Day22_Problem02_1.default() } (${ getTimeElapsed(startProblem22b) } ms)`)
  } catch (e) {
    console.error(e)
  }
  try {
    const startProblem23 = new Date()
    console.log(`    - Day 23, problem 1: ${ await Day23_Problem01_1.default() } (${ getTimeElapsed(startProblem23) } ms)`)
  } catch (e) {
    console.error(e)
  }
  try {
    const startProblem23b = new Date()
    console.log(`    - Day 23, problem 2: ${ await Day23_Problem02_1.default() } (${ getTimeElapsed(startProblem23b) } ms)`)
  } catch (e) {
    console.error(e)
  }
  try {
    const startProblem24 = new Date()
    console.log(`    - Day 24, problem 1: ${ await Day24_Problem01_1.default() } (${ getTimeElapsed(startProblem24) } ms)`)
  } catch (e) {
    console.error(e)
  }
  try {
    const startProblem24b = new Date()
    console.log(`    - Day 24, problem 2: ${ await Day24_Problem02_1.default() } (${ getTimeElapsed(startProblem24b) } ms)`)
  } catch (e) {
    console.error(e)
  }
  try {
    const startProblem25 = new Date()
    console.log(`    - Day 25: ${ await Day25_Problem01_1.default() } (${ getTimeElapsed(startProblem25) } ms)`)
  } catch (e) {
    console.error(e)
  }
  console.log('\n***********************************************************************\n')
  const end = new Date()
  console.log(`Total time elapsed: ${ end.getTime() - start.getTime() } ms\n\n`)
  const merryxmas = await fs_1.default.promises.readFile(path_1.default.join(__dirname, 'merryxmas.txt'))
  console.log(merryxmas.toString())
};
runAll().catch(console.error);
