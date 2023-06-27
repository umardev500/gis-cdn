import fs from 'fs'

export const writeFileAsync = async (
    dest: string,
    data: Buffer
): Promise<boolean> => {
    return await new Promise((resolve, reject) => {
        fs.writeFile(dest, data, (err) => {
            if (err !== null) {
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}
