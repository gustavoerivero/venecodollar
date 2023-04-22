/**
 * Represents a type for individual dollar values in bolivars.
 *
 * @property {string} title - The title or name of the entity that monitors the dollar value.
 * @property {number} dollar - The value of the dollar in bolivars.
 * @property {string} updatedDate - The date when the dollar value was last updated.
 */
export type DollarType = {
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
export type DollarArrayType = {
  title: string
  dollar: number
  updatedDate: string
}[]

/**
 * Represents a type for entities that monitor the dollar value and their corresponding information.
 *
 * @property {string} entity - The name of the entity that monitors the dollar value.
 * @property {DollarType} info - The information about the dollar value for the entity.
 */
export type EntityType = {
  entity: string
  info: DollarType
}

/**
 * Represents a type for average dollar values in bolivars for a specific date.
 *
 * @property {Date} date - The date for which the average dollar value is calculated.
 * @property {number} average - The average value of the dollar in bolivars for the given date.
 * @property {EntityType[]} entities - The array of entities and their corresponding information for the given date.
 */
export type DollarAverageType = {
  date: Date
  average: number
  entities: EntityType[]
}
