import fs from 'fs'

export default async (filename: string, preserveBlankLines?: boolean): Promise<string[]> => {
    const data = await fs.promises.readFile(filename)
    const lines = data.toString().split('\n').map((line) => line.trim())
    if (!preserveBlankLines) {
        return lines.filter((line) => line !== '')
    } else {
        return lines
    }
}
