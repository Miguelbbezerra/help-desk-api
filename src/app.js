import express from 'express'
import { AppDataSource } from './app-data-source.js'
import { router } from './router.js'
import bodyParser from 'body-parser'
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
const port = 5000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração da pasta de uploads como estática
app.use('/uploads', express.static(path.resolve('src/uploads')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(router(express))

AppDataSource.initialize().then(async () => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
})

