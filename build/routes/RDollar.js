"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var CDollar_1 = require("../controllers/CDollar");
/**
 * Express router for handling GET requests to the root endpoint.
 * @route GET /
 * @handler getDollar
 */
router.get('/', CDollar_1.getDollar);
/**
 * Express router for handling GET requests to the '/entity' endpoint.
 * @route GET /entity
 * @handler getSpecificDollar
 */
router.get('/entity', CDollar_1.getSpecificDollar);
module.exports = router;
