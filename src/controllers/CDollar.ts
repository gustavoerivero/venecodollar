import axios from 'axios'
import { Request, Response } from 'express'
import { updateDateFormat } from '../utils/updateDateFormat'

import { DollarArrayType, DollarAverageType, DollarType, EntityType } from '../types/DollarType'

require('dotenv').config()

const cheerio = require('cheerio')
const resp = require('../utils/responses')

/**
 * This module is responsible for obtaining and processing dollar values in bolivars from external sources.
 * It uses Axios for making HTTP requests, Cheerio for parsing HTML, and other utility functions.
 * The types DollarArrayType, DollarAverageType, DollarType, and EntityType are imported from '../types/DollarType'.
 * The updateDateFormat function is imported from '../utils/updateDateFormat'.
 * The dotenv and responses modules are also used in this module.
 */

/**
 * Fetches an array with different values of the dollar in bolivars managed by entities that monitor this value.
 *
 * @returns {Promise<DollarArrayType | null>} - A promise that resolves to an array with different dollar values
 * in bolivars given by the entities that monitor this value. Returns null if an error occurs.
 * @throws {Error} - If there is an error obtaining dollar values.
 */
export const getDollarPrices = async (): Promise<DollarArrayType | null> => {
  try {
    // Fetch data from the specified URL
    const url = process.env.BASE_URL || ''
    const { data } = await axios.get(url)

    // Parse HTML data using Cheerio
    const cheerioData = cheerio.load(data)

    // Extract relevant information from the parsed HTML
    const formatHTML = cheerioData('div.row.text-center')
      .find('div.col-12.col-sm-4.col-md-2.col-lg-2')

    const priceResult: DollarArrayType = new Array()

    formatHTML.each((_: number, div: any) => {
      let title = cheerioData(div)
        .find('h4')
        .text()

      let updatedDate = cheerioData(div)
        .find('small')
        .text()
        .split('actualizado')
        .pop()

      updatedDate = updateDateFormat(updatedDate)

      let text = cheerioData(div)
        .find('p')
        .text()
        .replace(',', '.')
        .split(' ')
        .slice(-1)
        .pop()

      let dollar = Number(text) || 0

      const dollarData = {
        title: title,
        dollar: dollar,
        updatedDate: updatedDate
      }

      return priceResult.push(dollarData)
    })

    // Return the array of dollar values
    return priceResult
  } catch (error) {
    // Handle error obtaining dollar values
    console.log(`Error obtaining dollar values.`, error)
    // Return null if an error occurs
    return null
  }
}

/**
 * Fetches an array with different values of the dollar in bolivars managed by entities that monitor this value. 
 * It also calculates the average of all entities with values greater than zero.
 *
 * @returns {Promise<DollarAverageType | null>} - A promise that resolves to an array with different dollar values
 * in bolivars managed by entities that monitor this value, including an average of all these entities. Returns null if an error occurs.
 * @throws {Error} - If there is an error calculating data.
 */
export const getDollarPricesWithAverage = async (): Promise<DollarAverageType | null> => {
  try {
    // Fetch dollar prices from a remote source
    const priceResult: DollarArrayType | null = await getDollarPrices()

    if (priceResult) {
      let average = 0
      let length = 0

      // Calculate average and create entities array
      const prices = priceResult.map((price: DollarType) => {
        average = average + price.dollar
        length = price.dollar > 0 ? length + 1 : length

        let entity: EntityType = {
          entity: price.title,
          info: price
        }

        return entity
      })

      // Create response object with average and entities array
      const response: DollarAverageType = {
        date: new Date(),
        average: Number((average / length).toFixed(2)),
        entities: prices
      }

      // Return the response object
      return response
    }

    // Return null if priceResult is null
    return null
  } catch (error) {
    // Handle error calculating data
    console.log(`Error calculating data.`, error)
    // Return null if an error occurs
    return null
  }
}

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
      response.forEach((item: EntityType) => {
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
