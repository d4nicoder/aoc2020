import readLines from '../readLines'
import path from 'path'

/**
 * Start point
 */
const main = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))
    const departuresMap = lines[1].split(',').map((id, index) => {
        return {
            id: id,
            offset: index
        }
    }).filter((bus) => bus.id !== 'x')

    let minTime: number = 0
    let product: number = 1
    // We look for this constrain: (t + offset) % busId === 0 (for each bus)
    departuresMap.forEach((bus) => {
        const id = parseInt(bus.id, 10)
        const offset = bus.offset

        let iterations = 0
        while ((minTime + offset) % id !== 0) {
            minTime += product
            iterations ++
        }
        product *= id
    })

    return minTime
}

export default main
