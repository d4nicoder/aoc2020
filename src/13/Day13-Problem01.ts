import readLines from '../readLines'
import path from 'path'

/**
 * Start point
 */
const main = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))
    const estimatedArrival: number = parseInt(lines[0], 10)

    let betterProximity = -1
    const busId = lines[1].split(',').reduce((accum: number, bus: string) => {
        if (bus === 'x') {
            return accum
        }
        const timestamp = parseInt(bus, 10)
        const departureTime = (Math.floor(estimatedArrival / timestamp) * timestamp) + timestamp
        if (betterProximity > departureTime || accum < 0) {
            accum = timestamp
            betterProximity = departureTime
        }
        return accum
    }, betterProximity)

    return busId * (betterProximity - estimatedArrival)
}

export default main
