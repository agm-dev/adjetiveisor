const adjet = require('../adjetiveisor')

test('verbose method returns true if true value received', () => {
  expect(adjet.verbose(true)).toBe(true)
})

test('verbose method returns false if no value received', () => {
  expect(adjet.verbose()).toBe(false)
})

test('verbose method returns false if anything but true is received', () => {
  expect(adjet.verbose('asdf')).toBe(false)
})
