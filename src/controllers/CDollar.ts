import { Request, Response } from 'express'

import { TEntity, TBsCalculated, TDollarCalculated } from '../types/TDollar'
import { calculateBsToDollar, calculateDollarToBs, getDollarPricesWithAverage } from '../services/dollar'

require('dotenv').config()

const resp = require('../utils/responses')

/**
 * Fetches dollar prices with average from a remote source.
 *
 * @param {Request} _ - Express request object (not used).
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining dollar values.
 */
export const getDollar = async (_: Request, res: Response): Promise<void> => {
  try {
    // Fetch dollar prices with average from a remote source
    const response = await getDollarPricesWithAverage()

    // Send successful response
    return resp.makeResponsesOkData(res, response, 'Success')
  } catch (error) {
    // Handle error obtaining dollar values
    console.log(`Error obtaining dollar values.`, error)
    // Send error response
    return resp.makeResponsesError(res, 'It has been impossible to connect to the server.')
  }
}

/**
 * Fetches specific dollar prices based on the entity name from a remote source.
 *
 * @param {Request} req - Express request object containing the query parameters.
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining dollar values.
 */
export const getSpecificDollar = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch dollar prices with average from a remote source
    const prices = await getDollarPricesWithAverage()
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
      response.forEach((item: TEntity) => {
        if (item.info.dollar > 0) {
          length = length + 1
          average = item.info.dollar + average
        }
      })

      // Calculate average dollar value and update response object
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
    // Handle error obtaining dollar values
    console.log(`Error obtaining dollar values.`, error)
    // Send error response
    return resp.makeResponsesError(res, 'It has been impossible to connect to the server.')
  }
}

/**
 * Fetches specific prices in dollars based on the amount of bolivars from a remote source.
 *
 * @param {Request} req - Express request object containing the query parameters.
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining dollar values.
 */
export const calculatorBsToDollar = async (req: Request, res: Response): Promise<void> => {
  try {
    // Obtain the amount in bolivars to be calculated in terms of dollars.
    const bs = Number(req.query.bs ?? 0)
    const entity = req.query.entity ?? null

    if (!bs || bs <= 0) {
      return resp.makeResponsesError(res, 'You must provide an amount to be calculated.')
    }

    let response: any
    let prices = await calculateBsToDollar(bs)

    if (prices && typeof entity === 'string') {
      // Filter entities based on the entity name
      response = prices.filter(item => item.entity.includes(entity))

    }

    if (response && response.length > 1) {
      let length = 0
      let average = 0
      response.forEach((item: TDollarCalculated) => {
        if (item.dollarCalculated > 0) {
          length = length + 1
          average = item.dollarCalculated + average
        }
      })

      // Calculate average dollar value and update response object
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
    // Handle error obtaining dollar values
    console.log(`Error obtaining dollar values.`, error)
    // Send error response
    return resp.makeResponsesError(res, 'It has been impossible to connect to the server.')
  }
}

/**
 * Fetches specific prices in bolivars based on the amount of dollars from a remote source.
 *
 * @param {Request} req - Express request object containing the query parameters.
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining dollar values.
 */
export const calculatorDollarToBs = async (req: Request, res: Response): Promise<void> => {
  try {
    // Obtain the amount in bolivars to be calculated in terms of dollars.
    const dollar = Number(req.query.dollar ?? 0)
    const entity = req.query.entity ?? null

    if (!dollar || dollar <= 0) {
      return resp.makeResponsesError(res, 'You must provide an amount to be calculated.')
    }

    let response: any
    let prices = await calculateDollarToBs(dollar)

    if (prices && typeof entity === 'string') {
      // Filter entities based on the entity name
      response = prices.filter(item => item.entity.includes(entity))

    }

    if (response && response.length > 1) {
      let length = 0
      let average = 0
      response.forEach((item: TBsCalculated) => {
        if (item.bolivarCalculated > 0) {
          length = length + 1
          average = item.bolivarCalculated + average
        }
      })

      // Calculate average dollar value and update response object
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
    // Handle error obtaining dollar values
    console.log(`Error obtaining dollar values.`, error)
    // Send error response
    return resp.makeResponsesError(res, 'It has been impossible to connect to the server.')
  }
}