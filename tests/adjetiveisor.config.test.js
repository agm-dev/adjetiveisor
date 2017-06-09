const adjetiveisor = require('../adjetiveisor')
const adjet = adjetiveisor()

test('config method returns true if correct config object is provided', () => {
  const config = {
    ms: 'male singular',
    mp: 'male plural',
    fs: 'female singular',
    fp: 'female plural'
  }
  expect(adjet.config(config)).toBe(true)
})

test('config method returns false if missing properties on config object', () => {
  const config = {
    ms: 'male singular',
    fs: 'female singular'
  }
  expect(adjet.config(config)).toBe(false)
})

test('config method returns false if config properties are not string type', () => {
  const config = {
    ms: 1,
    mp: 'male plural',
    fs: 3,
    fp: 'female plural'
  }
  expect(adjet.config(config)).toBe(false)
})
