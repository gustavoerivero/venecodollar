import { Request, Response } from 'express'

import { TBsEuroCalculated, TEuroCalculated, TEuroEntity } from '../types'
import { calculateBsToEuro, calculateEuroToBs, getEuroPricesWithAverage } from '../services'

require('dotenv').config()

const resp = require('../utils/responses')

/**
 * Fetches euro prices with average from a remote source.
 *
 * @param {Request} _ - Express request object (not used).
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining euro values.
 */
export const getEuro = async (_: Request, res: Response): Promise<void> => {
  try {
    // Fetch euro prices with average from a remote source
    const response = await getEuroPricesWithAverage()

    // Send successful response
    return resp.makeResponsesOkData(res, response, 'Success')
  } catch (error) {
    // Handle error obtaining euro values
    console.error(`Error obtaining euro values.`, error)
    // Send error response
    return resp.makeResponsesError(res, 'It has been impossible to connect to the server.')
  }
}

/**
 * Fetches specific euro prices based on the entity name from a remote source.
 *
 * @param {Request} req - Express request object containing the query parameters.
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining euro values.
 */
export const getSpecificEuro = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch euro prices with average from a remote source
    const prices = await getEuroPricesWithAverage()
    const entity = req.query.name
    let response: any

    if (prices && typeof entity === 'string') {
      // Filter entities based on the entity name
      response = prices.entities.filter(item => item.entity.includes(entity))

    } else {
      response = prices?.entities
    }

    if (response.length > 1) {
      let length = 0
      let average = 0
      response.forEach((item: TEuroEntity) => {
        if (item.info.euro > 0) {
          length = length + 1
          average = item.info.euro + average
        }
      })

      // Calculate average euro value and update response object
      response = {
        date: new Date(),
        average: average !== 0 ? Number((average / length).toFixed(2)) : 0,
        entities: response
      }

    } else {
      // Update response object with single entity if only one entity is found
      response = response.pop()
    }

    // Send successful response
    return resp.makeResponsesOkData(res, response, 'Success')
  } catch (error) {
    // Handle error obtaining euro values
    console.error(`Error obtaining euro values.`, error)
    // Send error response
    return resp.makeResponsesError(res, 'It has been impossible to connect to the server.')
  }
}

/**
 * Fetches specific prices in euros based on the amount of bolivars from a remote source.
 *
 * @param {Request} req - Express request object containing the query parameters.
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining euro values.
 */
export const calculatorBsToEuro = async (req: Request, res: Response): Promise<void> => {
  try {
    // Obtain the amount in bolivars to be calculated in terms of euros.
    const bs = Number(req.query.bs ?? 0)
    const entity = req.query.entity ?? null

    if (!bs || bs <= 0) {
      return resp.makeResponsesError(res, 'You must provide an amount to be calculated.')
    }

    let response: any
    let prices = await calculateBsToEuro(bs)

    if (prices && entity && typeof entity === 'string') {
      // Filter entities based on the entity name
      response = prices.filter(item => item.entity.includes(entity))
    } else {
      response = prices
    }

    if (response && response.length > 1) {
      let length = 0
      let average = 0
      response.forEach((item: TEuroCalculated) => {
        if (item.euroCalculated > 0) {
          length = length + 1
          average = item.euroCalculated + average
        }
      })

      // Calculate average euro value and update response object
      response = {
        date: new Date(),
        average: average !== 0 ? Number((average / length).toFixed(2)) : 0,
        entities: response
      }

    } else {
      // Update response object with single entity if only one entity is found
      response = response.pop()
    }

    // Send successful response
    return resp.makeResponsesOkData(res, response, 'Success')
  } catch (error) {
    // Handle error obtaining euro values
    console.error(`Error obtaining euro values.`, error)
    // Send error response
    return resp.makeResponsesError(res, 'It has been impossible to connect to the server.')
  }
}

/**
 * Fetches specific prices in bolivars based on the amount of euros from a remote source.
 *
 * @param {Request} req - Express request object containing the query parameters.
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining euro values.
 */
export const calculatorEuroToBs = async (req: Request, res: Response): Promise<void> => {
  try {
    // Obtain the amount in bolivars to be calculated in terms of euros.
    const euro = Number(req.query.euro ?? 0)
    const entity = req.query.entity ?? null

    if (!euro || euro <= 0) {
      return resp.makeResponsesError(res, 'You must provide an amount to be calculated.')
    }

    let response: any
    let prices = await calculateEuroToBs(euro)

    if (prices && entity && typeof entity === 'string') {
      // Filter entities based on the entity name
      response = prices.filter(item => item.entity.includes(entity))
    } else {
      response = prices
    }

    if (response && response.length > 1) {
      let length = 0
      let average = 0
      response.forEach((item: TBsEuroCalculated) => {
        if (item.bolivarCalculated > 0) {
          length = length + 1
          average = item.bolivarCalculated + average
        }
      })

      // Calculate average euro value and update response object
      response = {
        date: new Date(),
        average: average !== 0 ? Number((average / length).toFixed(2)) : 0,
        entities: response
      }

    } else {
      // Update response object with single entity if only one entity is found
      response = response.pop()
    }

    // Send successful response
    return resp.makeResponsesOkData(res, response, 'Success')
  } catch (error) {
    // Handle error obtaining euro values
    console.error(`Error obtaining euro values.`, error)
    // Send error response
    return resp.makeResponsesError(res, 'It has been impossible to connect to the server.')
  }
}