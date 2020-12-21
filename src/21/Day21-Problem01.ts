import readLines from '../readLines'
import path from 'path'

type IIngredient = {
    name: string;
    allergens: IAllergen[];
    appears: number;
}

type IAllergen = {
    name: string;
    appears: number;
}

type IIngredientSimple = {
    name: string;
    appears: number;
}

type IAllergenSummary = {
    name: string;
    appears: number;
    ingredients: IIngredientSimple[]
}

const allIngredients: Map<string, IIngredient> = new Map()
const allAllergens: Map<string, IAllergenSummary> = new Map()
const relationIng: {[name: string]: string;} = {}
const relationAl: {[name: string]: string;} = {}

const registerAllergen = (name: string, ingredients: string[]) => {
    ingredients = ingredients.map((i) => i.trim()).filter((i) => i !== '')
    if (!allAllergens.has(name)) {
        allAllergens.set(name, {
            name,
            appears: 1,
            ingredients: ingredients.map((i) => {
                return {
                    name: i,
                    appears: 1
                }
            })
        })
    } else {
        const data = allAllergens.get(name)
        if (data) {
            data.appears += 1
            for (let ingredient of ingredients) {
                let found = false
                for (let i = 0; i < data.ingredients.length; i++) {
                    if (ingredient === data.ingredients[i].name) {
                        data.ingredients[i].appears += 1
                        found = true
                    }
                }
                if (!found) {
                    data.ingredients.push({
                        name: ingredient,
                        appears: 1
                    })
                }
            }
            allAllergens.set(name, data)
        }
    }
}


const registerIngredient = (name: string, allergens: string[]): void => {
    if (!allIngredients.has(name)) {
        allIngredients.set(name, {
            name,
            allergens: allergens.map((a) => {
                return {
                    name: a,
                    appears: 1
                }
            }),
            appears: 1
        })
    } else {
        const data = allIngredients.get(name)
        if (data) {
            data.appears += 1
            for (let allergen of allergens) {
                let found = false
                for (let i = 0; i < data.allergens.length; i++) {
                    if (data.allergens[i].name === allergen) {
                        data.allergens[i].appears += 1
                        found = true
                    }
                }
                if (!found) {
                    data.allergens.push({
                        name: allergen,
                        appears: 1
                    })
                }
            }
            allIngredients.set(name, data)
        }
    }
}

const removeIngredientFromOthers = (allergenName: string, ingredientName: string): number => {
    let modifications = 0
    Array.from(allAllergens.values()).forEach((allergen) => {
        if (allergen.name !== allergenName) {
            const before = allergen.ingredients.length
            allergen.ingredients = allergen.ingredients.filter((a) => a.name !== ingredientName)
            const after = allergen.ingredients.length
            allAllergens.set(allergen.name, allergen)
            if (before > after) {
                modifications++
            }
        }
    })
    return modifications
}

const smartFilterAllergens = (): void => {
    let changed = true
    while (changed) {
        changed = false
        Array.from(allAllergens.values()).forEach((al) => {
            // Try to find the ingredient with the same apparitions as the allergen
            // and where any other ingredient has the same apparitions
            if (al.ingredients.length === 1) {
                // Only one
                if (removeIngredientFromOthers(al.name, al.ingredients[0].name)) {
                    changed = true
                }
                relationIng[al.ingredients[0].name] = al.name
                relationAl[al.name] = al.ingredients[0].name
            } else {
                const ing = al.ingredients
                ing.sort((a, b) => {
                    if (a.appears > b.appears) {
                        return -1
                    } else if (b.appears > a.appears) {
                        return 1
                    }
                    return 0
                })
                if (ing[0].appears > ing[1].appears) {
                    if (removeIngredientFromOthers(al.name, ing[0].name)) {
                        changed = true
                    }
                    al.ingredients = ing.splice(0, 1)
                    allAllergens.set(al.name, al)
                    relationIng[al.ingredients[0].name] = al.name
                    relationAl[al.name] = al.ingredients[0].name
                }
            }
        })
    }
}

const processLine = (line: string): void => {
    const match = line.match(/^(.*)\(contains (.*)\)$/)
    if (match) {
        const ingredients = match[1].split(' ').map((i) => i.trim())
        const allergens = match[2].split(', ').map((i) => i.trim())
        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i].trim()
            if (!ingredient) {
                continue
            }
            registerIngredient(ingredient, allergens)
        }

        for (let i = 0; i < allergens.length; i++) {
            const allergen = allergens[i].trim()
            if (!allergen) {
                continue
            }
            registerAllergen(allergen, ingredients)
        }
    }
}

const printIngredients = () => {
    Array.from(allIngredients.values()).forEach((ingredient) => {
        console.log(`${ingredient.name} (${ingredient.appears} times)`)
        for (const al of ingredient.allergens) {
            console.log(`    - ${al.name} (${al.appears} times)`)
        }
        console.log(``)
    })
}

const printAllergens = () => {
    Array.from(allAllergens.values()).forEach((allergen) => {
        console.log(`${allergen.name} (${allergen.appears} times)`)
        for (const ing of allergen.ingredients) {
            console.log(`    - ${ing.name} (${ing.appears} times)`)
        }
        console.log(``)
    })
}

const countOthers = (): number => {
    return Array.from(allIngredients.values()).reduce((accum: number, ing) => {
        if (typeof relationIng[ing.name] === 'undefined') {
            accum += ing.appears
        }
        return accum
    }, 0)
}

const main = async (): Promise<number> => {
    const lines = await readLines(path.join(__dirname, 'input.txt'))
    lines.forEach((line) => {
        processLine(line)
    })

    smartFilterAllergens()
    // printIngredients()
    printAllergens()
    console.log(relationIng)
    return countOthers()
}

main().then((result) => {
    console.log(`Result: ${result}`)
}).catch(console.error)
