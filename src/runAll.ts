import Day01Problem01 from './01/Day01-Problem01'
import Day01Problem02 from './01/Day01-Problem02'

import Day02Problem01 from './02/Day02-Problem01'
import Day02Problem02 from './02/Day02-Problem02'

const runAll = async () => {
    try {
        await Day01Problem01()
    } catch (e) {
        console.error(e)
    }

    console.log('\n\n')
    try {
        await Day01Problem02()
    } catch (e) {
        console.error(e)
    }

    console.log('\n\n')
    try {
        await Day02Problem01()
    } catch (e) {
        console.error(e)
    }

    console.log('\n\n')
    try {
        await Day02Problem02()
    } catch (e) {
        console.error(e)
    }
}

runAll().catch(console.error)
