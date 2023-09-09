// Dependencies
import express, { Response } from "express"
import cors from "cors"
import morgan from "morgan"
import routes from "./routes"
import swaggerDocs from "./services/swagger"
import swaggerUI from "swagger-ui-express"

// Dotenv
require("dotenv").config()

// Settings
const port = process.env.PORT ?? 3030
const app = express()

// Middlewares
app.use(express.json())
app.use(morgan("tiny"))
app.use(express.urlencoded({ extended: false }))

app.use(cors())

// Routes
const URL = `${process.env.API_VER_URL}`
const OLD = `${process.env.API_OLD}`
const DOC_URL = `${process.env.API_DOC}`

app.use(URL, routes)
app.use(OLD, routes)
app.use(DOC_URL, swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// Start server
app.get(URL, (_, res: Response) => res.send(`Connected!`))

app.listen(port, () => {
  console.log(`Server is running on ${URL}`)
})

/**
 * This module is responsible for setting up an Express server that listens for incoming requests.
 * It uses Express, cors, and morgan as middleware for handling requests and responses.
 * The routes module is imported and used for routing incoming requests.
 * The getDollarPrices and getDollarPricesWithAverage functions are exported from the "./controllers/CDollar" module.
 * The dotenv module is used for environment variable configuration.
 * The server listens on the specified port (either from environment variable or default 3030).
 * The base URL for the API is configured using environment variables and used for routing.
 * The server sends a "Connected!" response for the base URL to indicate successful connection.
 */