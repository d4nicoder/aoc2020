import readLines from '../readLines'
import path from 'path'

const start = async (file: string): Promise<number> => {
    const lines = await readLines(path.join(__dirname, file))

    return -1
}

start('sample.txt').then((result) => {
    console.log(`Result for sample input: ${result}`)
}).catch(console.error)

start('input.txt').then((result) => {
    console.log(`Result for problem input: ${result}`)
}).catch(console.error)
