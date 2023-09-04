/**
 * Represents a type for individual euro values in bolivars.
 *
 * @property {string} title - The title or name of the entity that monitors the euro value.
 * @property {number} euro - The value of the euro in bolivars.
 * @property {string} updatedDate - The date when the euro value was last updated.
 * @property {string} image - The image of the entity.
 */
export type TEuro = {
  title: string;
  euro: number;
  updatedDate: string;
  image?: string;
};

/**
 * Represents a type for an array of euro values in bolivars.
 *
 * @property {string} title - The title or name of the entity that monitors the euro value.
 * @property {number} euro - The value of the euro in bolivars.
 * @property {string} updatedDate - The date when the euro value was last updated.
 * @property {string} image - The image of the entity.
 */
export type TEuroArray = {
  title: string;
  euro: number;
  updatedDate: string;
  image?: string;
}[];

/**
 * Represents a type for entities that monitor the euro value and their corresponding information.
 *
 * @property {string} entity - The name of the entity that monitors the euro value.
 * @property {TEuro} info - The information about the euro value for the entity.
 */
export type TEuroEntity = {
  entity: string;
  info: TEuro;
};

/**
 * Represents a type for entities that control the value of the euro, its corresponding information and the respective calculation.
 *
 * @property {string} entity - The name of the entity that monitors the euro value.
 * @property {TEuro} info - The information about the euro value for the entity.
 * @property {number} euroCalculated - The value calculated in euro terms.
 */
export type TEuroCalculated = {
  entity: string;
  info: TEuro;
  euroCalculated: number;
};

/**
 * Represents a type for entities that control the value of the euro, its corresponding information and the respective calculation.
 *
 * @property {string} entity - The name of the entity that monitors the euro value.
 * @property {TEuro} info - The information about the euro value for the entity.
 * @property {number} bolivarCalculated - The value calculated in bolivar terms.
 */
export type TBsEuroCalculated = {
  entity: string;
  info: TEuro;
  bolivarCalculated: number;
};

/**
 * Represents a type for average euro values in bolivars for a specific date.
 *
 * @property {Date} date - The date for which the average euro value is calculated.
 * @property {number} average - The average value of the euro in bolivars for the given date.
 * @property {TEntity[]} entities - The array of entities and their corresponding information for the given date.
 */
export type TEuroAverage = {
  date: Date;
  average: number;
  entities: TEuroEntity[];
};

/**
 * Represents a type for average euro values in bolivars for a specific date.
 *
 * @property {Date} date - The date for which the average euro value is calculated.
 * @property {number} average - The average value of the euro in bolivars for the given date.
 * @property {TEuroCalculated[]} entities - The array of entities and their corresponding information for the given date.
 */
export type TEuroCalculatedAverage = {
  date: Date;
  average: number;
  entities: TEuroCalculated[];
};

/**
 * Represents a type for average euro values in bolivars for a specific date.
 *
 * @property {Date} date - The date for which the average euro value is calculated.
 * @property {number} average - The average value of the euro in bolivars for the given date.
 * @property {TBsCalculated[]} entities - The array of entities and their corresponding information for the given date.
 */
export type TBsEuroCalculatedAverage = {
  date: Date;
  average: number;
  entities: TBsEuroCalculated[];
};