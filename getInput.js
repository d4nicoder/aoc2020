const { spawn } = require('child_process')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')

dotenv.config()
const day = process.argv[2]

if (!day) {
  process.exit(1)
}

const command = 'curl'
const arguments = ['--cookie', `session=${process.env.SESSION}`, `https://adventofcode.com/2020/day/${day}/input`]

const req = spawn(command, arguments, {
  cwd: __dirname
})

let input = ''
req.stdout.on('data', data => {
  input += data.toString()
})

req.on('exit', code => {
  if (code !== 0) {
    console.error('Fail')
    process.exit(code)
  }
  const inputPath = path.join(__dirname, 'src', day, 'input.txt')
  if (!fs.existsSync(path.dirname(inputPath))) {
    fs.mkdirSync(path.dirname(inputPath), {recursive: true})
  }
  fs.writeFileSync(inputPath, input)
  console.log(`Input saved on ${inputPath}`)
})
