import fs from 'fs'
import path from 'path'

type IPassport = {
    byr?: string;
    iyr?: string;
    eyr?: string;
    hgt?: string;
    hcl?: string;
    ecl?: string;
    pid?: string;
    cid?: string;
}

const getLineFields = (line: string): IPassport => {
    const fields = line.split(' ')

    const passport: IPassport = {

    }
    for (let i = 0; i < fields.length; i++) {
        const [key, value] = fields[i].split(':')

        switch (key) {
            case 'byr':
                passport.byr = value
                break
            case 'iyr':
                passport.iyr = value
                break
            case 'eyr':
                passport.eyr = value
                break
            case 'hgt':
                passport.hgt = value
                break
            case 'hcl':
                passport.hcl = value
                break
            case 'ecl':
                passport.ecl = value
                break
            case 'pid':
                passport.pid = value
                break
            case 'cid':
                passport.cid = value
                break
        }
    }

    return passport
}

const getPassports = (rawData: string): IPassport[] => {
    const lines = rawData.split('\n')
    const passports: IPassport[] = []

    let actualPassport: IPassport = {}

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()

        if (line === '') {
            // new passport
            passports.push(actualPassport)
            actualPassport = {}
        }
        actualPassport = {...actualPassport, ...getLineFields(line)}
    }

    return passports
}

const getValidPassports = (passports: IPassport[]): number => {
    return passports.reduce((accum: number, passport: IPassport) => {
        if (passport.byr && passport.iyr && passport.eyr && passport.hgt && passport.hcl && passport.ecl && passport.pid) {
            accum += 1
        }
        return accum
    }, 0)
}

const start = async (): Promise<number> => {

    const data = await fs.promises.readFile(path.join(__dirname, 'input.txt'))
    const passports = getPassports(data.toString())
    const validPassports = getValidPassports(passports)
    return validPassports

}

export default start
