import getAverageValue from '../utils/getAverageValue'

const mockData = [1, 3, 5, 7, 10]

describe('average value', () => {
  it('should calculates average value properly', () => {
    mockData.reduce((prev, current, index) => {
      const avg = getAverageValue(prev, current, index)

      if (index === 0) expect(avg).toBe(1 / 1)
      if (index === 1) expect(avg).toBe((1 + 3) / 2)
      if (index === 2) expect(avg).toBe((1 + 3 + 5) / 3)
      if (index === 3) expect(avg).toBe((1 + 3 + 5 + 7) / 4)
      if (index === 4) expect(avg).toBe((1 + 3 + 5 + 7 + 10) / 5)

      return avg
    }, 0)
  })
})
