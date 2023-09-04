/**
 * Base URL.
 */
export const BASE_URL = process.env.BASE_URL ?? "https://exchangemonitor.net";

export {
  getDollarPrices,
  getDollarPricesWithAverage,
  calculateBsToDollar,
  calculateDollarToBs
} from './dollar'

export {
  getEuroPrices,
  getEuroPricesWithAverage,
  calculateBsToEuro,
  calculateEuroToBs
} from './euro'