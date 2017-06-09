const adjet = require('../adjetiveisor')

test('fails if no configured', () => {
  expect(adjet.translate('any text')).toBe('missing config')
})

test('fails if no text string provided', () => {
  adjet.config({ ms: 'puto', mp: 'putos', fs: 'puta', fp: 'putas' })
  expect(adjet.translate()).toBe('missing text')
})

test('translates "perro" into "puto perro"', () => {
  adjet.config({ ms: 'puto', mp: 'putos', fs: 'puta', fp: 'putas' })
  expect(adjet.translate('perro')).toBe('puto perro')
})

test('translates "el coche" into "el puto coche"', () => {
  adjet.config({ ms: 'puto', mp: 'putos', fs: 'puta', fp: 'putas' })
  expect(adjet.translate('el coche')).toBe('el puto coche')
})
