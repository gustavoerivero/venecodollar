'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
/**
 * Express router for handling requests to the '/dolar' endpoint.
 * @route /dolar
 * @handler require('./RDollar')
 */
router.use('/dolar', require('./RDollar'));
exports.default = router;
