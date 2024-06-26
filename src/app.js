import express from 'express'
import { AppDataSource } from './app-data-source.js'
import { router } from './router.js'

const app = express()
const port = 5000

app.use(router(express))

AppDataSource.initialize().then(async () => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
})

