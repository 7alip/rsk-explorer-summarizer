import convertTimestampToString from '../utils/convertTimestampToString'

describe('convert timestamp to string id', () => {
  it('should convert as day id', () => {
    expect(convertTimestampToString(1603623864339)).toBe('2020-10-25')
  })
})
