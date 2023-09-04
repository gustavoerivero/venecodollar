const router = require('express').Router()
import { calculatorBsToEuro, calculatorEuroToBs, getEuro, getSpecificEuro } from '../controllers'

/**
 * @swagger
 * /api/v1/euro:
 *  get:
 *    summary: Get the euro values in terms of bolivars (Bs.) given by the monitoring entities and an average of the same.
 *    tags:
 *      - euro
 *    description: Get an object which contains the date on which the query was made, an average of all the euro values given by the queried monitoring entities and an array with the monitored entities.
 *    responses:
 *      200:
 *        description: The API request has been successful.
 *      404:
 *        description: Not found.
 *      500:
 *        description: Internal server error.
 * 
 * /api/v1/euro/entity?name={name}:
 *  get:
 *    summary: Get the euro values in terms of bolivars (Bs.) given by the control entities filtered by name and, in the event that the name coincides with more than one entity, an average of the same.
 *    tags:
 *      - euro
 *    description: Gets an object containing the entities in charge of monitoring the euro value filtered by name. In case the name matches more than one entity, the query date and an average of all displayed entities will be returned along with the data of those entities.
 *    parameters:
 *      - name: name
 *        in: path
 *        description: Name of entity to return
 *        required: true
 *        schema:
 *          type: string
 *          example: '@DolarToday'
 *    responses:
 *      200:
 *        description: The API request has been successful.
 *      404:
 *        description: Not found.
 *      500:
 *        description: Internal server error.
 * 
 * /api/v1/euro/toeuro?bs={amount}&entity={name}:
 *  get:
 *    summary: Obtain the euro values of a bolivar amount provided by parameter.
 *    tags:
 *      - euro
 *    description: Obtain the euro values of a bolivar amount provided by parameter.
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
 *          example: '@DolarToday'
 *    responses:
 *      200:
 *        description: The API request has been successful.
 *      404:
 *        description: Not found.
 *      500:
 *        description: Internal server error.
 * 
 * /api/v1/euro/toBs?euro={amount}&entity={name}:
 *  get:
 *    summary: Obtain the bolivar values of a euro amount provided by parameter.
 *    tags:
 *      - euro
 *    description: Obtain the bolivar values of a euro amount provided by parameter.
 *    parameters:
 *      - name: euro
 *        in: path
 *        description: euro amount provided.
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
 *          example: '@DolarToday'
 *    responses:
 *      200:
 *        description: The API request has been successful.
 *      404:
 *        description: Not found.
 *      500:
 *        description: Internal server error.
 */
router.get('/', getEuro)
router.get('/entity', getSpecificEuro)
router.get('/toEuro', calculatorBsToEuro)
router.get('/toBs', calculatorEuroToBs)

module.exports = router
