import express from 'express';
import { calculatorBsToDollar, calculatorDollarToBs, getDollar, getSpecificDollar } from '../controllers';

const router = express.Router();

/**
 * @swagger
 * /api/v1/dollar:
 *  get:
 *    summary: Get the dollar values in terms of bolivars (Bs.) given by the monitoring entities and an average of the same.
 *    tags:
 *      - dollar
 *    description: Get an object which contains the date on which the query was made, an average of all the dollar values given by the queried monitoring entities and an array with the monitored entities.
 *    responses:
 *      200:
 *        description: The API request has been successful.
 *      404:
 *        description: Not found.
 *      500:
 *        description: Internal server error.
 *
 * /api/v1/dollar/entity?name={name}:
 *  get:
 *    summary: Get the dollar values in terms of bolivars (Bs.) given by the control entities filtered by name and, in the event that the name coincides with more than one entity, an average of the same.
 *    tags:
 *      - dollar
 *    description: Gets an object containing the entities in charge of monitoring the dollar value filtered by name. In case the name matches more than one entity, the query date and an average of all displayed entities will be returned along with the data of those entities.
 *    parameters:
 *      - name: name
 *        in: path
 *        description: Name of entity to return
 *        required: true
 *        schema:
 *          type: string
 *          example: "@DolarToday"
 *    responses:
 *      200:
 *        description: The API request has been successful.
 *      404:
 *        description: Not found.
 *      500:
 *        description: Internal server error.
 *
 * /api/v1/dollar/toDollar?bs={amount}&entity={name}:
 *  get:
 *    summary: Obtain the dollar values of a bolivar amount provided by parameter.
 *    tags:
 *      - dollar
 *    description: Obtain the dollar values of a bolivar amount provided by parameter.
 *    parameters:
 *      - name: bs
 *        in: path
 *        description: Bolivar amount provided.
 *        required: true
 *        schema:
 *          type: number
 *          example: 1080
 *      - name: name
 *        in: path
 *        description: Name of entity to return
 *        required: true
 *        schema:
 *          type: string
 *          example: "@DolarToday"
 *    responses:
 *      200:
 *        description: The API request has been successful.
 *      404:
 *        description: Not found.
 *      500:
 *        description: Internal server error.
 *
 * /api/v1/dollar/toBs?dollar={amount}&entity={name}:
 *  get:
 *    summary: Obtain the bolivar values of a dollar amount provided by parameter.
 *    tags:
 *      - dollar
 *    description: Obtain the bolivar values of a dollar amount provided by parameter.
 *    parameters:
 *      - name: dollar
 *        in: path
 *        description: Dollar amount provided.
 *        required: true
 *        schema:
 *          type: number
 *          example: 1080
 *      - name: name
 *        in: path
 *        description: Name of entity to return
 *        required: true
 *        schema:
 *          type: string
 *          example: "@DolarToday"
 *    responses:
 *      200:
 *        description: The API request has been successful.
 *      404:
 *        description: Not found.
 *      500:
 *        description: Internal server error.
 */
router.get('/', getDollar);
router.get('/entity', getSpecificDollar);
router.get('/toDollar', calculatorBsToDollar);
router.get('/toBs', calculatorDollarToBs);

export default router;
