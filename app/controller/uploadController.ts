import { type Request, type Response } from 'express'
import { type UploadResponseData } from '../../types'
import { uploadService } from '../service'

interface UploadResponse {
    success?: boolean
    error?: string
    message?: string
    data?: UploadResponseData
}

export const uploadHandler = async (req: Request, res: Response): Promise<void> => {
    let response: UploadResponse

    try {
        const file = req.file
        if (file === undefined) {
            await Promise.reject(new Error('error'))
            return
        }
        const data = await uploadService(file)
        response = {
            success: true,
            message: 'upload file successfully',
            data,
        }

        res.send(response)
    } catch (err) {
        response = {
            success: false,
        }
        res.json(response)
    }
}
