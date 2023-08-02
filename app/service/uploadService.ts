import path from 'path'
import sharp from 'sharp'
import { writeFileAsync } from '../helpers'
import { type UploadResponseData } from '../../types'

export const uploadService = async (file: Express.Multer.File): Promise<UploadResponseData> => {
    const now = Math.floor(Date.now() / 1000)
    const uploadPath = path.join(__dirname, '../../..', 'uploads', 'images')
    const fileFormat = file?.originalname.split('.').pop() ?? ''
    const fileName = `${file?.fieldname ?? ''}-${now}.${fileFormat}`
    const mainOutPath = path.join(uploadPath, fileName)
    const smallFileName = `${file.fieldname ?? ''}-small-${now}.${fileFormat}`
    const smallOutPath = path.join(uploadPath, smallFileName)

    // define file url
    const fileURL = `${process.env.BASE_URL ?? ''}/app2/uploads/images/${fileName}`
    const fileSmallURL = `${process.env.BASE_URL ?? ''}/app2/uploads/images/${smallFileName}`

    try {
        const sourceBuff = file.buffer

        // write regular picture
        await writeFileAsync(mainOutPath, sourceBuff)

        // write small picture as thumbnail
        const smallBuffer = await sharp(sourceBuff)
            .resize(148, 158, {
                position: 'top',
                fit: 'cover',
            })
            .png({
                quality: 100,
            })
            .toBuffer()

        // write to file the small picture as thumbnail
        await writeFileAsync(smallOutPath, smallBuffer)

        // return the urls
        return await Promise.resolve({
            url: fileURL,
            thumbUrl: fileSmallURL,
        })
    } catch (err) {
        return await Promise.reject(err)
    }
}
