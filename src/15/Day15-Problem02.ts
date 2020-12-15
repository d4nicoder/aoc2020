const reg: Map<number, number> = new Map()

const main = async (): Promise<number> => {
    const real_input = '8,0,17,4,1,12'

    const input = real_input.split(',').map((num) => parseInt(num, 10))

    input.forEach((num, index) => {
        if (index < input.length - 1) {
            reg.set(num, index)
        }
    })

    for (let i = input.length; i < 30000000; i++) {
        const last = input[i - 1]
        if (reg.has(last)) {
            const idx = reg.get(last) || 0
            input.push((i - 1) - idx)
            reg.set(last, i -1)
        } else {
            input.push(0)
            reg.set(last, i - 1)
        }
    }

    return input[input.length - 1]
}

export default main
// main().then((result) => {
//     console.log(`Result: ${result}`)
// })
