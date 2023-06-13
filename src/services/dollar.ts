import * as cheerio from 'cheerio'
import { TBsCalculated, TDollar, TDollarArray, TDollarAverage, TDollarCalculated, TEntity } from '../types/TDollar'
import { updateDateFormat } from '../utils/updateDateFormat'

/**
 * Fetches an array with different values of the dollar in bolivars managed by entities that monitor this value.
 *
 * @returns {Promise<TDollarArray | null>} - A promise that resolves to an array with different dollar values
 * in bolivars given by the entities that monitor this value. Returns null if an error occurs.
 * @throws {Error} - If there is an error obtaining dollar values.
 */
export const getDollarPrices = async (): Promise<TDollarArray | null> => {
  try {
    // Fetch data from the specified URL
    const response = await fetch('https://monitordolarvenezuela.com/', {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })

    if (!response.ok) {
      throw new Error('Request failed')
    }

    // Parse text response from fetch function.
    const data = await response.text()

    // Parse HTML data using Cheerio
    const cheerioData = cheerio.load(data)

    // Extract relevant information from the parsed HTML
    const formatHTML = cheerioData('div.row.text-center')
      .find('div.col-12.col-sm-4.col-md-2.col-lg-2')

    const priceResult: TDollarArray = []

    formatHTML.each((_: number, div: any) => {
      let title = cheerioData(div)
        .find('h4')
        .text()

      let updatedDate = cheerioData(div)
        .find('small')
        .text()
        .split('actualizado')
        .pop()

      updatedDate = updateDateFormat(updatedDate ?? null)

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

      priceResult.push(dollarData)

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
 * @returns {Promise<TDollarAverage | null>} - A promise that resolves to an array with different dollar values
 * in bolivars managed by entities that monitor this value, including an average of all these entities. Returns null if an error occurs.
 * @throws {Error} - If there is an error calculating data.
 */
export const getDollarPricesWithAverage = async (): Promise<TDollarAverage | null> => {
  try {
    // Fetch dollar prices from a remote source
    const priceResult: TDollarArray | null = await getDollarPrices()

    if (priceResult) {
      let average = 0
      let length = 0

      // Calculate average and create entities array
      const prices = priceResult.map((price: TDollar) => {
        average = average + price.dollar
        length = price.dollar > 0 ? length + 1 : length

        let entity: TEntity = {
          entity: price.title,
          info: price
        }

        return entity
      })

      // Create response object with average and entities array
      const response: TDollarAverage = {
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
* Fetches an array with the different values of the dollar in bolivars handled by the entities that control this value and calculates the value of the amount of dollars supplied in bolivars. 
 * @param dollar {number} - Amount in dollars to be calculated in bolivars.
 * @returns {Promise<TBsCalculated[] | null>} - A promise that resolves to an array with different dollar values.
 * in bolivars handled by entities that control this value, along with the calculation in bolivars of the amount supplied in dollars as a parameter. Returns null if an error occurs.
 * @throws {Error} - If there is an error calculating the data.
 */
export const calculateDollarToBs = async (dollar: number): Promise<TBsCalculated[] | null> => {
  try {

    if (!dollar || dollar <= 0) {
      return null
    }

    const entities = await getDollarPricesWithAverage()

    let calculatedEntities: TBsCalculated[] = []

    if (entities?.entities && entities?.entities.length > 0) {
      entities.entities.forEach(item => {
        calculatedEntities.push({
          ...item,
          bolivarCalculated: item.info.dollar > 0 ? Number(Number(item.info.dollar * dollar).toFixed(2)) : 0
        })
      })
    }

    return calculatedEntities

  } catch (error) {
    // Handle error calculating data
    console.log(`Error calculating data.`, error)
    // Return null if an error occurs
    return null
  }
}

/**
* Fetches an array with the different values of the bolivars in dollars handled by the entities that control this value and calculates the value of the amount of bolivars supplied in dollars. 
 * @param bs {number} - Amount in bolivars to be calculated in dollars.
 * @returns {Promise<TDollarCalculated[] | null>} - A promise that resolves to an array with different dollar values.
 * in bolivars handled by entities that control this value, along with the calculation in bolivars of the amount supplied in dollars as a parameter. Returns null if an error occurs.
 * @throws {Error} - If there is an error calculating the data.
 */
export const calculateBsToDollar = async (bs: number): Promise<TDollarCalculated[] | null> => {
  try {

    if (!bs || bs <= 0) {
      return null
    }

    const entities = await getDollarPricesWithAverage()

    let calculatedEntities: TDollarCalculated[] = []

    if (entities?.entities && entities?.entities.length > 0) {
      entities.entities.forEach(item => {
        calculatedEntities.push({
          ...item,
          dollarCalculated: item.info.dollar > 0 ? Number(Number(bs / item.info.dollar).toFixed(2)) : 0
        })
      })
    }

    return calculatedEntities

  } catch (error) {
    // Handle error calculating data
    console.log(`Error calculating data.`, error)
    // Return null if an error occurs
    return null
  }
}