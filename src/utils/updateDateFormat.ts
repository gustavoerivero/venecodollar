/**
 * Method that allows to take a date given by the API that provides the values and convert it to a user-friendly format.
 * @param updatedDate Date in disorganized format in string type.
 * @returns {string | null} Date formatted as a string. If the parameter value is null, the null value is returned as well.
 */
export const updateDateFormat = (updatedDate: string | null): string | null => {
  if (!updatedDate) return null

  let formatDate = updatedDate.split(' ')

  const hour = formatDate[1]
  let meridiem = ''
  let day: string = ''

  const lastIndex = formatDate.length - 1

  if (formatDate.length > 3) {
    day = formatDate[lastIndex]
    meridiem = formatDate[lastIndex - 1].substring(0, 2)
  } else {
    day = formatDate[lastIndex].slice(2)
    meridiem = formatDate[lastIndex].slice(0, 2)
  }

  return `${hour} ${meridiem}, ${day}`

}
