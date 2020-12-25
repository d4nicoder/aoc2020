// INPUT
const doorPublic = 19774466
const cardPublic = 7290641

// SAMPLE
// const doorPublic = 17807724
// const cardPublic = 5764801

/*
The card always uses the same secret loop
The door always uses a different secret loop
 */

const transform = (publicKey: number, loopTime: number): number => {
    //console.log(`Transforming ${publicKey} with a loop time of ${loopTime}`)
    let value = 1
    for (let i = 0; i < loopTime; i++) {
        value = value * publicKey
        value = value % 20201227
    }
    return value
}

const main = async (): Promise<number> => {
    let finish = 0
    let loop = 0
    let subjectNumber = 7
    let product = 1
    let secretLoopCard: number = 0
    let secretLoopDoor: number = 0
    while (finish < 2) {
        loop++
        product = product * subjectNumber
        product = product % 20201227
        // console.log(`[${loop}] subjectNumber: ${product}`)
        if (product === doorPublic) {
            //console.log(`Secret loop of card: ${loop}`)
            secretLoopDoor = loop
            finish++
        } else if (product === cardPublic) {
            //console.log(`Secret loop of door: ${loop}`)
            secretLoopCard = loop
            finish++
        }
    }

    const doorSecret = transform(doorPublic, secretLoopCard)
    const cardSecret = transform(cardPublic, secretLoopDoor)
    // console.log(`Door secret: ${doorSecret}`)
    // console.log(`Card secret: ${cardSecret}`)

    return cardSecret
}

export default main
// main().then((result) => {
//     console.log(`Result: ${result}`)
// })
