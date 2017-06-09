const adjetiveisor = require('../adjetiveisor')
const adjet = adjetiveisor()

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

test('does a correct translation on verbose config provided', () => {
  adjet.config({ ms: 'puto', mp: 'putos', fs: 'puta', fp: 'putas' })
  expect(adjet.translate('tengo mi coche en la acera')).toBe('tengo mi coche en la puta acera')
  adjet.verbose(true)
  expect(adjet.translate('tengo mi coche en la acera')).toBe('tengo mi puto coche en la puta acera')
  adjet.verbose(false)
})

test('removes duplicates', () => {
  adjet.config({ ms: 'puto', mp: 'putos', fs: 'puta', fp: 'putas' })
  expect(adjet.translate('el puto coche')).toBe('el puto coche')
})
