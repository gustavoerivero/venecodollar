import * as cheerio from 'cheerio'
import { convertDate, getDate, getHour } from '../utils/formatDate'
import { BASE_URL } from '.'
import { TBsEuroCalculated, TEuro, TEuroArray, TEuroAverage, TEuroCalculated, TEuroEntity } from '../types'

/**
 * Fetches an array with different values of the dollar in bolivars managed by entities that monitor this value.
 *
 * @returns {Promise<TEuroArray | null>} - A promise that resolves to an array with different dollar values
 * in bolivars given by the entities that monitor this value. Returns null if an error occurs.
 * @throws {Error} - If there is an error obtaining dollar values.
 */
export const getEuroPrices = async (): Promise<TEuroArray | null> => {
  try {
    // Fetch data from the specified URL
    const response = await fetch(`${BASE_URL}/dolar-venezuela/EUR`, {
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

    const priceResult: TEuroArray = []

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

      const euro = Number(text ?? 0)

      const euroData = {
        title: title,
        euro: euro,
        updatedDate: `${hour} del ${date?.dayWeek.toLowerCase()} ${date?.day} de ${date?.month}, ${date?.year}`
      }

      priceResult.push(euroData)

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
 * @returns {Promise<TEuroAverage | null>} - A promise that resolves to an array with different dollar values
 * in bolivars managed by entities that monitor this value, including an average of all these entities. Returns null if an error occurs.
 * @throws {Error} - If there is an error calculating data.
 */
export const getEuroPricesWithAverage = async (): Promise<TEuroAverage | null> => {
  try {
    // Fetch dollar prices from a remote source
    const priceResult: TEuroArray | null = await getEuroPrices()

    if (priceResult) {
      let average = 0
      let length = 0

      // Calculate average and create entities array
      const prices = priceResult.map((price: TEuro) => {
        average = price.title !== "Petro" ? Number(average) + Number(price.euro) : Number(average)
        length = Number(price.euro) > 0 && price.title !== "Petro" ? length + 1 : length

        let entity: TEuroEntity = {
          entity: price.title,
          info: price
        }

        return entity
      })

      // Create response object with average and entities array
      const response: TEuroAverage = {
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
* Fetches an array with the different values of the dollar in bolivars handled by the entities that control this value and calculates the value of the amount of euros supplied in bolivars. 
 * @param euro {number} - Amount in euros to be calculated in bolivars.
 * @returns {Promise<TBsCalculated[] | null>} - A promise that resolves to an array with different dollar values.
 * in bolivars handled by entities that control this value, along with the calculation in bolivars of the amount supplied in euros as a parameter. Returns null if an error occurs.
 * @throws {Error} - If there is an error calculating the data.
 */
export const calculateEuroToBs = async (euro: number): Promise<TBsEuroCalculated[] | null> => {
  try {

    if (!euro || euro <= 0) {
      return null
    }

    const entities = await getEuroPricesWithAverage()

    let calculatedEntities: TBsEuroCalculated[] = []

    if (entities?.entities && entities?.entities.length > 0) {
      entities.entities.forEach(item => {
        calculatedEntities.push({
          ...item,
          bolivarCalculated: Number(item.info.euro) > 0 ? Number(Number(Number(item.info.euro) * euro).toFixed(2)) : 0
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
* Fetches an array with the different values of the bolivars in euros handled by the entities that control this value and calculates the value of the amount of bolivars supplied in euros. 
 * @param bs {number} - Amount in bolivars to be calculated in euros.
 * @returns {Promise<TEuroCalculated[] | null>} - A promise that resolves to an array with different dollar values.
 * in bolivars handled by entities that control this value, along with the calculation in bolivars of the amount supplied in euros as a parameter. Returns null if an error occurs.
 * @throws {Error} - If there is an error calculating the data.
 */
export const calculateBsToEuro = async (bs: number): Promise<TEuroCalculated[] | null> => {
  try {

    if (!bs || bs <= 0) {
      return null
    }

    const entities = await getEuroPricesWithAverage()

    let calculatedEntities: TEuroCalculated[] = []

    if (entities?.entities && entities?.entities.length > 0) {
      entities.entities.forEach(item => {
        calculatedEntities.push({
          ...item,
          euroCalculated: Number(item.info.euro) > 0 ? Number(Number(bs / Number(item.info.euro)).toFixed(2)) : 0
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