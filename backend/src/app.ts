import express from 'express'
import cors from 'cors'
import { routes } from './http'

const app = express()
app.use(express.json())
app.use(cors(), routes)

export { app }