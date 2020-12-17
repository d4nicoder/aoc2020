import readLines from '../readLines'
import path from 'path'

type ICoordinate = {
    x: number;
    y: number;
    z: number;
    w: number;
}

type ICube = {
    coords: ICoordinate;
    state: string;
}

let pocket: Map<string, ICube> = new Map()

const getFlatCoord = (coords: ICoordinate): string => {
    return `${ coords.x }x${ coords.y }x${ coords.z }x${ coords.w }`
}

const setCube = (coord: ICoordinate, state: string): void => {
    const flatCoord = getFlatCoord(coord)
    pocket.set(flatCoord, {
        coords: coord,
        state,
    })
}

const getState = (coords: ICoordinate): string => {
    const flatCoord = getFlatCoord(coords)
    if (pocket.has(flatCoord)) {
        const data = pocket.get(flatCoord)
        if (data) {
            return data.state
        }
        return '.'
    } else {
        // Create it
        pocket.set(flatCoord, {
            coords,
            state: '.',
        })
    }
    return '.'
}

const cleanMap = (): void => {
    // Get min and max value of every axis with an active box
    let minX = 0
    let minY = 0
    let minZ = 0
    let minW = 0
    let maxX = 0
    let maxY = 0
    let maxZ = 0
    let maxW = 0
    Array.from(pocket.entries()).forEach((data) => {
        if (data[1].state === '#') {
            minX = minX > data[1].coords.x ? data[1].coords.x : minX
            minY = minY > data[1].coords.y ? data[1].coords.y : minY
            minZ = minZ > data[1].coords.z ? data[1].coords.z : minZ
            minW = minW > data[1].coords.w ? data[1].coords.w : minW
            maxX = maxX < data[1].coords.x ? data[1].coords.x : maxX
            maxY = maxY < data[1].coords.y ? data[1].coords.y : maxY
            maxZ = maxZ < data[1].coords.z ? data[1].coords.z : maxZ
            maxW = maxW < data[1].coords.w ? data[1].coords.w : maxW
        }
    })

    // Delete all out of bounds
    let newMap: Map<string, ICube> = new Map()
    Array.from(pocket.entries()).forEach((data) => {
        if (
            data[1].coords.x < minX || data[1].coords.x > maxX
            || data[1].coords.y < minY || data[1].coords.y > maxY
            || data[1].coords.z < minZ || data[1].coords.z > maxZ
            || data[1].coords.w < minW || data[1].coords.w > maxW
        ) {
            return
        }
        newMap.set(data[0], data[1])
    })
    pocket = newMap
}

const growMap = (): void => {
    const newMap: Map<string, ICube> = new Map()
    Array.from(pocket.entries()).forEach((cube) => {
        const neighbors = getNeighbors(cube[1].coords)
        for (let i = 0; i < neighbors.length; i++) {
            const flatNeighbor = getFlatCoord(neighbors[i])
            if (pocket.has(flatNeighbor)) {
                const neighbor = pocket.get(flatNeighbor)
                if (neighbor) {
                    newMap.set(flatNeighbor, neighbor)
                } else {
                    newMap.set(flatNeighbor, {
                        coords: neighbors[i],
                        state: '.',
                    })
                }
            } else {
                newMap.set(flatNeighbor, {
                    coords: neighbors[i],
                    state: '.',
                })
            }
        }
    })
    pocket = newMap
}

const nextCicle = (): void => {
    // Grow
    growMap()
    const newMap: Map<string, ICube> = new Map()
    Array.from(pocket.entries()).forEach((data) => {
        const neighbors = getNeighbors(data[1].coords)
        let actives: number = 0
        for (let i = 0; i < neighbors.length; i++) {
            const state = getState(neighbors[i])
            if (state === '#') {
                actives += 1
            }
        }
        let newState = data[1].state
        if (data[1].state === '.') {
            if (actives === 3) {
                newState = '#'
            } else {
                newState = '.'
            }
        } else {
            if (actives >= 2 && actives <= 3) {
                newState = '#'
            } else {
                newState = '.'
            }
        }
        newMap.set(data[0], {
            coords: data[1].coords,
            state: newState,
        })
    })

    // Update pocket
    pocket = newMap
    cleanMap()
}

const getNeighbors = (coords: ICoordinate): ICoordinate[] => {
    const neighbors: ICoordinate[] = []
    for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
            for (let z = -1; z < 2; z++) {
                for (let w = -1; w < 2; w++) {
                    const coord: ICoordinate = {
                        x: coords.x + x,
                        y: coords.y + y,
                        z: coords.z + z,
                        w: coords.w + w,
                    }
                    if (coords.x !== coord.x || coords.y !== coord.y || coords.z !== coord.z || coords.w !== coord.w) {
                        neighbors.push(coord)
                    }
                }
            }
        }
    }
    return neighbors
}


const main = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))
    lines.forEach((line, y: number) => {
        const z = 0
        const w = 0
        const cubes = line.split('')
        for (let x = 0; x < cubes.length; x++) {
            setCube({ x, y, z, w }, cubes[x])
        }
    })

    for (let i = 0; i < 6; i++) {
        nextCicle()
    }

    return Array.from(pocket.values()).reduce((accum, cube) => {
        if (cube.state === '#') {
            accum += 1
        }
        return accum
    }, 0)
}

export default main
