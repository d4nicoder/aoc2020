"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readLines_1 = __importDefault(require("../readLines"));
const path_1 = __importDefault(require("path"));
const allIngredients = new Map();
const allAllergens = new Map();
const relationIng = {};
const relationAl = {};
const registerAllergen = (name, ingredients) => {
    ingredients = ingredients.map((i) => i.trim()).filter((i) => i !== '');
    if (!allAllergens.has(name)) {
        allAllergens.set(name, {
            name,
            appears: 1,
            ingredients: ingredients.map((i) => {
                return {
                    name: i,
                    appears: 1
                };
            })
        });
    }
    else {
        const data = allAllergens.get(name);
        if (data) {
            data.appears += 1;
            for (let ingredient of ingredients) {
                let found = false;
                for (let i = 0; i < data.ingredients.length; i++) {
                    if (ingredient === data.ingredients[i].name) {
                        data.ingredients[i].appears += 1;
                        found = true;
                    }
                }
                if (!found) {
                    data.ingredients.push({
                        name: ingredient,
                        appears: 1
                    });
                }
            }
            allAllergens.set(name, data);
        }
    }
};
const registerIngredient = (name, allergens) => {
    if (!allIngredients.has(name)) {
        allIngredients.set(name, {
            name,
            allergens: allergens.map((a) => {
                return {
                    name: a,
                    appears: 1
                };
            }),
            appears: 1
        });
    }
    else {
        const data = allIngredients.get(name);
        if (data) {
            data.appears += 1;
            for (let allergen of allergens) {
                let found = false;
                for (let i = 0; i < data.allergens.length; i++) {
                    if (data.allergens[i].name === allergen) {
                        data.allergens[i].appears += 1;
                        found = true;
                    }
                }
                if (!found) {
                    data.allergens.push({
                        name: allergen,
                        appears: 1
                    });
                }
            }
            allIngredients.set(name, data);
        }
    }
};
const removeIngredientFromOthers = (allergenName, ingredientName) => {
    let modifications = 0;
    Array.from(allAllergens.values()).forEach((allergen) => {
        if (allergen.name !== allergenName) {
            const before = allergen.ingredients.length;
            allergen.ingredients = allergen.ingredients.filter((a) => a.name !== ingredientName);
            const after = allergen.ingredients.length;
            allAllergens.set(allergen.name, allergen);
            if (before > after) {
                modifications++;
            }
        }
    });
    return modifications;
};
const smartFilterAllergens = () => {
    let changed = true;
    while (changed) {
        changed = false;
        Array.from(allAllergens.values()).forEach((al) => {
            // Try to find the ingredient with the same apparitions as the allergen
            // and where any other ingredient has the same apparitions
            if (al.ingredients.length === 1) {
                // Only one
                if (removeIngredientFromOthers(al.name, al.ingredients[0].name)) {
                    changed = true;
                }
                relationIng[al.ingredients[0].name] = al.name;
                relationAl[al.name] = al.ingredients[0].name;
            }
            else {
                const ing = al.ingredients;
                ing.sort((a, b) => {
                    if (a.appears > b.appears) {
                        return -1;
                    }
                    else if (b.appears > a.appears) {
                        return 1;
                    }
                    return 0;
                });
                if (ing[0].appears > ing[1].appears) {
                    if (removeIngredientFromOthers(al.name, ing[0].name)) {
                        changed = true;
                    }
                    al.ingredients = ing.splice(0, 1);
                    allAllergens.set(al.name, al);
                    relationIng[al.ingredients[0].name] = al.name;
                    relationAl[al.name] = al.ingredients[0].name;
                }
            }
        });
    }
};
const processLine = (line) => {
    const match = line.match(/^(.*)\(contains (.*)\)$/);
    if (match) {
        const ingredients = match[1].split(' ').map((i) => i.trim());
        const allergens = match[2].split(', ').map((i) => i.trim());
        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i].trim();
            if (!ingredient) {
                continue;
            }
            registerIngredient(ingredient, allergens);
        }
        for (let i = 0; i < allergens.length; i++) {
            const allergen = allergens[i].trim();
            if (!allergen) {
                continue;
            }
            registerAllergen(allergen, ingredients);
        }
    }
};
const printIngredients = () => {
    Array.from(allIngredients.values()).forEach((ingredient) => {
        console.log(`${ingredient.name} (${ingredient.appears} times)`);
        for (const al of ingredient.allergens) {
            console.log(`    - ${al.name} (${al.appears} times)`);
        }
        console.log(``);
    });
};
const printAllergens = () => {
    Array.from(allAllergens.values()).forEach((allergen) => {
        console.log(`${allergen.name} (${allergen.appears} times)`);
        for (const ing of allergen.ingredients) {
            console.log(`    - ${ing.name} (${ing.appears} times)`);
        }
        console.log(``);
    });
};
const countOthers = () => {
    return Array.from(allIngredients.values()).reduce((accum, ing) => {
        if (typeof relationIng[ing.name] === 'undefined') {
            accum += ing.appears;
        }
        return accum;
    }, 0);
};
const getCanonicalList = () => {
    const arr = Array.from(Object.entries(relationAl));
    arr.sort((a, b) => {
        if (a[0] > b[0]) {
            return 1;
        }
        else if (b[0] > a[0]) {
            return -1;
        }
        return 0;
    });
    return arr.map((a) => a[1]).join(',');
};
const main = async () => {
    const lines = await readLines_1.default(path_1.default.join(__dirname, 'input.txt'));
    lines.forEach((line) => {
        processLine(line);
    });
    smartFilterAllergens();
    return getCanonicalList();
};
exports.default = main;
