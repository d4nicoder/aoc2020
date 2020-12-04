import fs from 'fs'
import path from 'path'
import { match } from 'assert'

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

const isBetween = (candidate: string, low: number, high: number): boolean => {
    const intCandidate = parseInt(candidate, 10)

    const result = (intCandidate >= low && intCandidate <= high)
    return result
}

const getValidPassports = (passports: IPassport[]): number => {
    return passports.reduce((accum: number, passport: IPassport) => {
        if (passport.byr && passport.iyr && passport.eyr && passport.hgt && passport.hcl && passport.ecl && passport.pid) {
            // Validating byr
            if (!/^[0-9]{4}$/.test(passport.byr) || !isBetween(passport.byr, 1920, 2002)) {
                return accum
            }

            // Validating iyr
            if (!/^[0-9]{4}$/.test(passport.iyr) || !isBetween(passport.iyr, 2010, 2020)) {
                return accum
            }

            // Validating eyr
            if (!/^[0-9]{4}$/.test(passport.eyr) || !isBetween(passport.eyr, 2020, 2030)) {
                return accum
            }

            // Validating hgt
            const regexpHeight = /^([0-9]+)(cm|in)$/
            const matchHeight = passport.hgt.match(regexpHeight)
            if (!matchHeight) {
                return accum
            }
            if (matchHeight[2] === 'cm' && !isBetween(matchHeight[1], 150, 193)) {
                return accum
            } else if (matchHeight[2] === 'in' && !isBetween(matchHeight[1], 59, 76)) {
                return accum
            }

            // Validating hcl
            const hclRegexp = /^#[\da-f]{6}$/
            if (!hclRegexp.test(passport.hcl)) {
                return accum
            }

            // Validating ecl
            const eclRegexp = /^(amb|blu|brn|gry|grn|hzl|oth)$/
            if (!eclRegexp.test(passport.ecl)) {
                return accum
            }

            // Validating pid
            const pidRegexp = /^[\d]{9}$/
            if (!pidRegexp.test(passport.pid)) {
                return accum
            }

            accum += 1
        }
        return accum
    }, 0)
}

const start = async (): Promise<number> => {
    const data = await fs.promises.readFile(path.join(__dirname, 'input.txt'))
    const passports = getPassports(data.toString())
    return getValidPassports(passports)
}

export default start
