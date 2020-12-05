import fs from 'fs'
import path from 'path'
import readLines from '../readLines'

const getPassId = (coordinates: string): number => {
    const coords = coordinates.replace(/B/gm, '1').replace(/F/gm, '0').replace(/L/gm, '0').replace(/R/gm, '1')
    return parseInt(coords, 2)
}

const start = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))
    const ids: number[] = lines.map((line) => {
        return getPassId(line)
    })

    ids.sort((a, b) => {
        if (a > b) {
            return -1
        } else if (b > a) {
            return 1
        }
        return 0
    })

    return ids[0]
}
export default start
