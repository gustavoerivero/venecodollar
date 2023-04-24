'use strict'

const router = require('express').Router()

/**
 * Express router for handling requests to the '/dolar' endpoint.
 * @route /dolar
 * @handler require('./RDollar')
 */
router.use('/dollar', require('./RDollar'))

export default router
