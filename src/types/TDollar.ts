/**
 * Represents a type for individual dollar values in bolivars.
 *
 * @property {string} title - The title or name of the entity that monitors the dollar value.
 * @property {number} dollar - The value of the dollar in bolivars.
 * @property {string} updatedDate - The date when the dollar value was last updated.
 */
export type TDollar = {
  title: string
  dollar: number
  updatedDate: string
}

/**
 * Represents a type for an array of dollar values in bolivars.
 *
 * @property {string} title - The title or name of the entity that monitors the dollar value.
 * @property {number} dollar - The value of the dollar in bolivars.
 * @property {string} updatedDate - The date when the dollar value was last updated.
 */
export type TDollarArray = {
  title: string
  dollar: number
  updatedDate: string
}[]

/**
 * Represents a type for entities that monitor the dollar value and their corresponding information.
 *
 * @property {string} entity - The name of the entity that monitors the dollar value.
 * @property {TDollar} info - The information about the dollar value for the entity.
 */
export type TEntity = {
  entity: string
  info: TDollar
}

/**
 * Represents a type for entities that control the value of the dollar, its corresponding information and the respective calculation.
 *
 * @property {string} entity - The name of the entity that monitors the dollar value.
 * @property {TDollar} info - The information about the dollar value for the entity.
 * @property {number} dollarCalculated - The value calculated in dollar terms.
 */
export type TDollarCalculated = {
  entity: string,
  info: TDollar,
  dollarCalculated: number
}

/**
 * Represents a type for entities that control the value of the dollar, its corresponding information and the respective calculation.
 *
 * @property {string} entity - The name of the entity that monitors the dollar value.
 * @property {TDollar} info - The information about the dollar value for the entity.
 * @property {number} bolivarCalculated - The value calculated in bolivar terms.
 */
export type TBsCalculated = {
  entity: string,
  info: TDollar,
  bolivarCalculated: number
}

/**
 * Represents a type for average dollar values in bolivars for a specific date.
 *
 * @property {Date} date - The date for which the average dollar value is calculated.
 * @property {number} average - The average value of the dollar in bolivars for the given date.
 * @property {TEntity[]} entities - The array of entities and their corresponding information for the given date.
 */
export type TDollarAverage = {
  date: Date
  average: number
  entities: TEntity[]
}

/**
 * Represents a type for average dollar values in bolivars for a specific date.
 *
 * @property {Date} date - The date for which the average dollar value is calculated.
 * @property {number} average - The average value of the dollar in bolivars for the given date.
 * @property {TDollarCalculated[]} entities - The array of entities and their corresponding information for the given date.
 */
export type TDollarCalculatedAverage = {
  date: Date,
  average: number,
  entities: TDollarCalculated[]
}

/**
 * Represents a type for average dollar values in bolivars for a specific date.
 *
 * @property {Date} date - The date for which the average dollar value is calculated.
 * @property {number} average - The average value of the dollar in bolivars for the given date.
 * @property {TBsCalculated[]} entities - The array of entities and their corresponding information for the given date.
 */
export type TBsCalculatedAverage = {
  date: Date,
  average: number,
  entities: TBsCalculated[]
}