type IAverageValue = (prev: number, current: number, index: number) => number

/**
 *
 * @param prev - previous value in a loop
 * @param current - current value in a loop
 * @param index - loop index
 *
 * @description
 */
const getAverageValue: IAverageValue = (prev: number, current: number, index: number): number =>
  (prev * index + current) / (index + 1)

export default getAverageValue
