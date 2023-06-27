import dotenv from 'dotenv'
import express from 'express'
import uploadRouter from './routes/app'

dotenv.config()

const app = express()
const port = process.env.PORT ?? 5001

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// serve static
app.use('/api', uploadRouter)

// start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
