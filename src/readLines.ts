import fs from 'fs'

export default async (filename: string): Promise<string[]> => {
    const data = await fs.promises.readFile(filename)
    return data.toString().split('\n').map((line) => line.trim()).filter((line) => line !== '')
}
