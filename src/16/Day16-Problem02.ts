import path from 'path'
import readLines from "../readLines"

type IDefinitions = {
  [name: string]: string[];
}

const definitions: IDefinitions = {}
let myTicket: number[] = []
let nearbyTickets: number[][] = []

const positions: {[position: number]: string[]} = {}

/**
 * Evaluate if this number satisfies all constrains from definitions
 * @param num
 */
const evaluateNumber = (num: number): boolean => {
  let valid = false
  for (const definition in definitions) {
    if (!definitions.hasOwnProperty(definition)) {
      continue
    }
    const intervals = definitions[definition]
    for (let i = 0; i < intervals.length; i++) {
      const [min, max] = intervals[i].split('-').map((n) => parseInt(n, 10))
      if (num >= min && num <= max) {
        return true
      }
    }
  }
  return valid
}

/**
 * Return an array with the posible fields for that number
 * @param num
 */
const getPossibleFields = (num: number): string[] => {
  const fields: string[] = []
  for (const definition in definitions) {
    if (!definitions.hasOwnProperty(definition)) {
      continue
    }
    const intervals = definitions[definition]
    for (let i = 0; i < intervals.length; i++) {
      const [min, max] = intervals[i].split('-').map((n) => parseInt(n, 10))
      if (num >= min && num <= max) {
        fields.push(definition)
      }
    }
  }
  return fields
}

/**
 * Register valid fields for that position and delete other fields stored in this position
 * @param position
 * @param fields
 */
const registerPosition = (position: number, fields: string[]): void => {
  if (typeof positions[position] === 'undefined') {
    positions[position] = fields
    return
  }

  // strip positions fields that are not in the provided fields
  positions[position] = positions[position].filter((field: string) => fields.indexOf(field) >= 0)
}

/**
 * Delete one field from positions where there are more than one field
 * @param field
 */
const deleteField = (field: string): boolean => {
  let deleted = false
  for (const position in positions) {
    if (positions.hasOwnProperty(position)) {
      const k = positions[position].indexOf(field)
      if (k >= 0 && positions[position].length > 1) {
        positions[position].splice(k, 1)
        deleted = true
      }
    }
  }
  return deleted
}
/**
 * Search for positions with only one field, and delete this field from other positions
 */
const filter = (): void => {
  let repeat = false
  for (const position in positions) {
    if (positions.hasOwnProperty(position)) {
      if (positions[position].length === 1) {
        // Delete this field from others
        if (deleteField(positions[position][0])) {
          repeat = true
        }

      }
    }
  }
  if (repeat) {
    filter()
  }
}

const main = async (): Promise<number> => {
  const lines = await readLines(path.join(__dirname, 'input.txt'))

  let stage = 0
  lines.forEach((line) => {
    if (line === 'your ticket:') {
      stage = 1
      return
    } else if (line === 'nearby tickets:') {
      stage = 2
      return
    }
    if (stage === 0) {
      const definition = line.split(':')
      const intervals = definition[1].split(' or ')
      definitions[definition[0]] = intervals.map((interval) => interval.trim())
    } else if (stage === 1) {
      myTicket = line.split(',').map((item) => parseInt(item, 10))
    } else if (stage === 2) {
      nearbyTickets.push(line.split(',').map((item) => parseInt(item, 10)))
    }
  })

  const validTickets: number[][] = nearbyTickets.filter((ticket) => {
    for (let i = 0; i < ticket.length; i++) {
      if (!evaluateNumber(ticket[i])) {
        return false
      }
    }
    return true
  })

  for (let i = 0; i < validTickets.length; i++) {
    validTickets[i].forEach((num, index) => {
      const fields = getPossibleFields(num)
      registerPosition(index, fields)
    })
  }
  // Les delete duplicated fields on positions with multiples fields
  filter()

  // Multiply values of fields starting with departure from my ticket and return this number
  return Array.from(Object.values(positions)).reduce((accum, field, index) => {
    if (/^departure/.test(field[0])) {
      accum *= myTicket[index]
    }
    return accum
  }, 1)
}
export default main
