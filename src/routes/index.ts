"use strict"

const router = require("express").Router()

/**
 * Express router for handling requests to the "/dolar" endpoint.
 * @route /dolar
 * @handler require("./RDollar")
 */
router.use("/dollar", require("./RDollar"))

/**
 * Express router for handling requests to the "/euro" endpoint.
 * @route /euro
 * @handler require("./REuro")
 */
router.use("/euro", require("./REuro"))

export default router
