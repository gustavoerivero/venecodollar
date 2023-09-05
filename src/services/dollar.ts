import * as cheerio from 'cheerio'
import { TBsDollarCalculated, TDollar, TDollarArray, TDollarAverage, TDollarCalculated, TDollarEntity } from '../types/TDollar'
import { convertDate, getDate, getHour } from '../utils/formatDate'
import { BASE_URL } from '.'

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
    const response = await fetch(`${BASE_URL}/dolar-venezuela`, {
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
    const formatHTML = cheerioData('div.row')
      .find('div.col-xs-12.col-sm-6.col-md-4.col-tabla')

    const priceResult: TDollarArray = []

    formatHTML.each((_: number, div: any) => {

      const title = cheerioData(div)
        .find('h6.nombre')
        .text()

      const cheerioDate = cheerioData(div)
        .find('p.fecha')
        .text()

      let dateFormat = convertDate(cheerioDate)

      const hour = getHour(dateFormat);
      const date = getDate(dateFormat);

      const text = cheerioData(div)
        .find('p.precio')
        .text()
        .replace('.', '')
        .replace(',', '.')

      const dollar = Number(text ?? 0)

      const image = cheerioData(div)
        .find('img')
        .attr('src')

      const dollarData = {
        title,
        dollar,
        updatedDate: `${hour} del ${date?.dayWeek.toLowerCase()} ${date?.day} de ${date?.month}, ${date?.year}`,
        image: BASE_URL + image
      }

      priceResult.push(dollarData)

    })

    // Return the array of dollar values
    return priceResult
  } catch (error) {
    // Handle error obtaining dollar values
    console.error(`Error obtaining dollar values.`, error)
    // Return null if an error occurs
    return null
  }
}

/**
 * Fetches an array with different values of the dollar in bolivars managed by entities that monitor this value. 
 * It also calculates the average of all entities with values greater than zero.
 *
 * @returns {Promise<TAverage | null>} - A promise that resolves to an array with different dollar values
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
        average = price.title !== "Petro" ? Number(average) + Number(price.dollar) : Number(average)
        length = Number(price.dollar) > 0 && price.title !== "Petro" ? length + 1 : length

        let entity: TDollarEntity = {
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
    console.error(`Error calculating data.`, error)
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
export const calculateDollarToBs = async (dollar: number): Promise<TBsDollarCalculated[] | null> => {
  try {

    if (!dollar || dollar <= 0) {
      return null
    }

    const entities = await getDollarPricesWithAverage()

    let calculatedEntities: TBsDollarCalculated [] = []

    if (entities?.entities && entities?.entities.length > 0) {
      entities.entities.forEach((item) => {
        calculatedEntities.push({
          ...item,
          bolivarCalculated: Number(item.info.dollar) > 0 && item.info.title !== "Petro" ? Number(Number(Number(item.info.dollar) * dollar).toFixed(2)) : 0
        })
      })
    }

    return calculatedEntities

  } catch (error) {
    // Handle error calculating data
    console.error(`Error calculating data.`, error)
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
          dollarCalculated: Number(item.info.dollar) > 0 && item.info.title !== "Petro" ? Number(Number(bs / Number(item.info.dollar)).toFixed(2)) : 0
        })
      })
    }

    return calculatedEntities

  } catch (error) {
    // Handle error calculating data
    console.error(`Error calculating data.`, error)
    // Return null if an error occurs
    return null
  }
}