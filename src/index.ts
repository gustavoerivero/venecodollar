import express, { Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import routes from './routes'

require('dotenv').config()

const port = process.env.PORT || 3030
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: false }))

app.use(cors())

const url = `${process.env.URL}${process.env.API_VER_URL}`

app.use(url, routes)

app.get(url, (_, res: Response) => res.send(`Connected!`))

app.listen(port, () => {
  console.log(`Server is running on ${url}`)
})

/**
 * This module is responsible for setting up an Express server that listens for incoming requests.
 * It uses Express, cors, and morgan as middleware for handling requests and responses.
 * The routes module is imported and used for routing incoming requests.
 * The getDollarPrices and getDollarPricesWithAverage functions are exported from the './controllers/CDollar' module.
 * The dotenv module is used for environment variable configuration.
 * The server listens on the specified port (either from environment variable or default 3030).
 * The base URL for the API is configured using environment variables and used for routing.
 * The server sends a 'Connected!' response for the base URL to indicate successful connection.
 */