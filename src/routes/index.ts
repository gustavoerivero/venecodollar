'use strict';

import express from 'express';
import rDollar from './RDollar';
import rEuro from './REuro';

const router = express.Router();

/**
 * Express router for handling requests to the "/dolar" endpoint.
 * @route /dolar
 * @handler require("./RDollar")
 */
router.use('/dollar', rDollar);

/**
 * Express router for handling requests to the "/euro" endpoint.
 * @route /euro
 * @handler require("./REuro")
 */
router.use('/euro', rEuro);

export default router;
