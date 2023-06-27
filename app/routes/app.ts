import express from 'express'
import multer from 'multer'
import { uploadHandler } from '../controller'

const memoryStorage = multer.memoryStorage()
const upload = multer({ storage: memoryStorage })

const router = express.Router()
router.post('/upload', upload.single('picture'), uploadHandler)

export default router
