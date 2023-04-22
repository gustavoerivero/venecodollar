const router = require('express').Router()
import { getDollar, getSpecificDollar } from '../controllers/CDollar'

/**
 * Express router for handling GET requests to the root endpoint.
 * @route GET /
 * @handler getDollar
 */
router.get('/', getDollar)

/**
 * Express router for handling GET requests to the '/entity' endpoint.
 * @route GET /entity
 * @handler getSpecificDollar
 */
router.get('/entity', getSpecificDollar)

module.exports = router
