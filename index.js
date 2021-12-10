import express from 'express'
import cookieParser from 'cookie-parser'
import {router} from './public/routes.js'


export const app = express()
app.use(cookieParser('21gyhu3j4itko5yp'))
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use('/', router)


const port = 3000
app.listen(port, () => console.log(`http://localhost:${port}...`))
